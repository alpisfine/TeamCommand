const plugin = {
    name: "lang",
    description: "Change sinusbot TTS language with a command!",
    type: "command",
    command: ["!lang", "!langlist"],
    requireModules:["ts3"],
    activeServerId: 22
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        if (!(ev.msg.startsWith(plugin.command[0]) || ev.msg.startsWith(plugin.command[1]))) return;

        if (ev.msg == plugin.command[1]) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "[URL]https://cloud.google.com/text-to-speech/docs/voices[/URL]");
            return;
        }

        var lang = ev.msg.substring(plugin.command[0].length + 1).trim();

        if (lang == "list") {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "[URL]https://cloud.google.com/text-to-speech/docs/voices[/URL]");
            return;
        }

        if (!/.{2,3}-.{2}/g.test(lang)) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Malfowmed language Pwease check Uwu");
            return;
        }

        var request = require('request');

        request.post("http://127.0.0.1:7211/api/v1/bot/login", {
            json: {
                username: "ts3api",
                password: "ts3api",
                botId: "015b18a9-b5cf-401b-81f5-c18c7d60c097" // Obtained using /api/v1/botId, I just hardcoded it ;-; sowwy.
            }
        }, function (error, response,body) {

            if (!error && response.statusCode == 200) {
                request.post('http://127.0.0.1:7211/api/v1/bot/i/6638345d-d259-4c3f-b33d-e4fc378722ba/settings', {
                    auth: {
                        'bearer': body.token
                    },
                    json:{
                        instanceId:"6638345d-d259-4c3f-b33d-e4fc378722ba",
                        nick:"Delilah",
                        ttsDefaultLocale:lang
                    }
                }, (err, res) => {
                    if (!err && res.statusCode == 200) {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "TTS language changed to " + lang);
                    } else {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:2, What's this Owo ?");
                    }
                });
            } else {
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Sinusbot misbehaving Code:1, What's this Owo ?");
            }
        });

    });


}

module.exports = plugin;