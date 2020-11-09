const plugin = {
    name: "stop",
    description: "Stop it Pls, I beg of you!",
    type: "command",
    command: "!stop",
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
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Mülobot misbehaving Code:11, What's this Owo ?");
            } else {
                request.post(CONFIG.SinusBot.apiUrl + '/i/' + CONFIG.SinusBot.bots[0].instanceId + '/stop', {
                    auth: {
                        'bearer': body.token
                    },
                    json: {
                        instanceId: CONFIG.SinusBot.bots[0].instanceId,
                    }
                }, (err, res) => {
                    if (err || res.statusCode != 200) {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Mülobot misbehaving Code:22, What's this Owo ?");
                    }
                });
            }
        });
    });
}


module.exports = plugin;