const plugin = {
    name: "botcall",
    description: "Call in bots using chat commands!",
    type: "command",
    command: "!botcall",
    activeServerId: 22
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        var args = ev.msg.split(' ');
        if (args[1] != this.command) return;
        if (args.length == 1) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Usage: !botcall mülobot / !botcall delilah / !botcall mülobot delilah");
            return;
        }
        var request = require('request');

        request.post("http://127.0.0.1:7211/api/v1/bot/login", {
            json: {
                username: "ts3api",
                password: "ts3api",
                botId: "015b18a9-b5cf-401b-81f5-c18c7d60c097" // Obtained using /api/v1/botId, I just hardcoded it ;-; sowwy.
            }
        }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:1, What's this Owo ?");
            } else {
                for (let i = 1; i < args.length; i++) {
                    if (args[i] == "mülobot" || args[i] == "mulobot" || args[i] == "musicbot" || args[i] == "bot1") {
                        request.post('http://127.0.0.1:7211/api/v1/bot/i/6638345d-d259-4c3f-b33d-e4fc378722ba/settings', {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: "6638345d-d259-4c3f-b33d-e4fc378722ba",
                                nick: "Delilah",
                                ttsDefaultLocale: lang
                            }
                        }, (err, res) => {
                            if (!err && res.statusCode == 200) {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "TTS language changed to " + lang);
                            } else {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                            }
                        });
                    } else if (args[i] == "delilah" || args[i] == "tts" || args[i] == "bot2") {
                        request.post('http://127.0.0.1:7211/api/v1/bot/i/6638345d-d259-4c3f-b33d-e4fc378722ba/settings', {
                            auth: {
                                'bearer': body.token
                            },
                            json: {
                                instanceId: "b92db3c1-0e81-41d8-913f-72f3b1135bf9",
                                nick: "Delilah",
                                ttsDefaultLocale: lang
                            }
                        }, (err, res) => {
                            if (!err && res.statusCode == 200) {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "TTS language changed to " + lang);
                            } else {
                                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                            }
                        });
                    }
                }
            }

        });

    });

}

module.exports = plugin;