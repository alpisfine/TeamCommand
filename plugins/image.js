const plugin = {
    name: "image",
    description: "My Sweet Image banner generator API!",
    type: "command",
    command: "!image",
    activeServerId: 22
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        if (!ev.msg.startsWith(plugin.command)) return;

        if(ev.msg == plugin.command + " default"){ //  Change to default image part.
            request.post({ url: 'http://localhost:3232', form: { updateImage: "default" } }, function (err, httpResponse) {
                if (!err && httpResponse.statusCode == 200) {
                    teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Yay banner image updated by " + ev.invoker.nickname);
                } else {
                    teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Can't weach to Bannew generatow, uwu No?");
                }
                return;
            });
        }

        var url = ev.msg.substring(plugin.command.length + 1).trim();
        
        url = url.replace('[URL]','').replace('[/URL]',''); // Clear TS3 URL tags

        if (!validURL(url)) {
            teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Mawfowmed URL, pwease check UwU");
            return;
        }

        var request = require('request');

        request(url, function (error, response) {
            if (!error && response.statusCode == 200) {
                request.post({ url: 'http://localhost:3232', form: { updateImage: url } }, function (err, httpResponse) {
                    if (!err && httpResponse.statusCode == 200) {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Yay banner image updated by " + ev.invoker.nickname);
                    } else {
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Can't weach to Bannew generatow, uwu No?");
                    }
                });
            } else {
                teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Can't weach to URL, What's this Owo ?");
                return;
            }
        });

    });

    function validURL(str) {
        var pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        return !!pattern.test(str);
    }


}

module.exports = plugin;