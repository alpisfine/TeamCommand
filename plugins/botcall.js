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

        request.post("http://127.0.0.1:7211/api/v1/bot/login", {
            json: {
                username: "ts3api",
                password: "ts3api",
                botId: "f4ce8d60-d9ee-406a-9e9f-e27cdd3e5e10" // Obtained using /api/v1/botId, I just hardcoded it ;-; sowwy.
            }
        }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:1, What's this Owo ?");
            } else {
                    if (args[1] == "mülobot" || args[1] == "mulobot" || args[1] == "musicbot" || args[1] == "bot1") {
                        request.post('http://127.0.0.1:7211/api/v1/bot/i/2cd9ed2b-ed31-41bd-9ef1-d2ed227911ae/'+args[2], {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: "2cd9ed2b-ed31-41bd-9ef1-d2ed227911ae",
                            }
                        }, (err, res) => {
                            if (!err && res.statusCode == 200) {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Mülobot "+ args[2]+"ed");
                            } else {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                            }
                        });
                    } else if (args[1] == "delilah" || args[1] == "tts" || args[1] == "bot2") {
                        request.post('http://127.0.0.1:7211/api/v1/bot/i/65de97fe-6ce9-468d-b9fb-43f7658e033e/'+args[2], {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: "65de97fe-6ce9-468d-b9fb-43f7658e033e",
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