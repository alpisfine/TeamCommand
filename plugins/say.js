const plugin = {
    name: "say",
    description: "Text to speech!",
    type: "command",
    command: "!say",
    requireModules: ["ts3"],
    activeServerId: 2
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        var args = ev.msg.split(' ');
        if (args[0] != this.command) return;
        if (args.length < 2) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Usage: !say message");
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
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Delilah misbehaving Code:1, What's this Owo ?");
            } else {
                request.post(CONFIG.SinusBot.apiUrl + '/i/' + CONFIG.SinusBot.bots[1].instanceId + '/say', {
                    auth: {
                        'bearer': body.token
                    },
                    json: {
                        instanceId: CONFIG.SinusBot.bots[1].instanceId,
                        text: args.slice(1).join(' '),
                    }
                }, (err, res) => {
                    if (err || res.statusCode != 200) {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Delilah misbehaving Code:2, What's this Owo ?");
                    }
                });
            }
        });
    });
}


module.exports = plugin;