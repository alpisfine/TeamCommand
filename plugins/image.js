const plugin = {
    name: "music",
    description: "Toggle channel quality for music listening and voip!",
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
        teamspeak.getChannelByID(ev.invoker.cid).then(channel => {
            var url = ev.msg.substring(plugin.command.length+1);
            var request = require('request');
            
            if(!validURL(url)){
                teamspeak.sendTextMessage(ev.invoker.clid,ev.targetmode,"Mawfowmed URL, pwease check UwU");
                return;
            }

            request(url, function (error, response) {
                if (!error && response.statusCode == 200) {
                    request.post({url:'http://localhost:3232', form: {updateImage:url}}, function(err,httpResponse,body){ 
                        if (!error && response.statusCode == 200) {
                            teamspeak.sendTextMessage(ev.invoker.clid,ev.targetmode,"Yay banner image updated by "+ ev.invoker.nickname);
                        }else{
                            teamspeak.sendTextMessage(ev.invoker.clid,ev.targetmode,"Can't weach to Bannew generatow, uwu No?");
                        }
                    });
                }else{
                    teamspeak.sendTextMessage(ev.invoker.clid,ev.targetmode,"Can't weach to URL, What's this Owo ?");
                    return;
                }
            });

        });

        function validURL(str) {
            var pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
            return !!pattern.test(str);
          }

    });

}

module.exports = plugin;