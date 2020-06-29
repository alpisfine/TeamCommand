const plugin = {
    name: "botcall",
    description: "Call in bots using chat commands!",
    type: "command",
    command: "!botcall",
    requireModules:["ts3"],
    activeServerId: 22
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        var args = ev.msg.split(' ');
        if (args[0] != this.command) return;
        if (args.length < 3) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Usage: !botcall mülobot spawn/ !botcall delilah respawn/ !botcall mülobot kill");
            return;
        }
        var request = require('request');
        const CONFIG = require("../config.json");
        request.post(CONFIG.SinusBot.apiUrl + "/login", {
            json: {
                username: CONFIG.SinusBot.apiUsername,
                password: CONFIG.SinusBot.apiPassword,
                botId: CONFIG.SinusBot.botid
            }
        }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:1, What's this Owo ?");
            } else {
                    if (CONFIG.SinusBot.bots[0].possibleNicknames.includes(args[1])) {
                        request.post(CONFIG.SinusBot.apiUrl+'/i/'+CONFIG.SinusBot.bots[0].instanceId+'/'+args[2], {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: CONFIG.SinusBot.bots[0].instanceId,
                            }
                        }, (err, res) => {
                            if (!err && res.statusCode == 200) {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Mülobot "+ args[2]+"ed");
                            } else {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                            }
                        });
                    } else if (CONFIG.SinusBot.bots[1].possibleNicknames.includes(args[1])) {
                        request.post(CONFIG.SinusBot.apiUrl+'/i/'+CONFIG.SinusBot.bots[1].instanceId+'/'+args[2], {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: CONFIG.SinusBot.bots[1].instanceId,
                            }
                        }, (err, res) => {
                            if (!err && res.statusCode == 200) {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Delilah "+ args[2]+"ed");
                            } else {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                            }
                        });
                    }
                }

        });

    });

}

module.exports = plugin;