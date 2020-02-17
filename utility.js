var utility = {
registeredPlugins:[],
sid: 22
}

utility.initHelp = function(config){ // A !help command for the listings of commands.
    const { TeamSpeak } = require("ts3-nodejs-library");
    TeamSpeak.connect({
        host: config.Query.host,
        queryport: config.Query.port, //optional
        //serverport: 9987,
        username: config.Query.username,
        password: config.Query.password,
        nickname: "test"
    }).then(async teamspeak => {
        teamspeak.useBySid(utility.sid).then(async () => {
            teamspeak.registerEvent("textchannel");
            teamspeak.registerEvent("textserver");
            teamspeak.registerEvent("textprivate");
        
            teamspeak.on("textmessage", ev => {
                if(ev.msg == "!help" || ev.msg == '!commands'){
                    teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "Created by Naiad04 with <3");
                    teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, "List of available commands/plugins:");
                    utility.registeredPlugins.forEach((plugin)=>{
                        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, `;${plugin.name} - ${plugin.description} - ${plugin.command}`);
                    });
                }else return;
            });
        });

    }).catch(e => {
        console.log("An error occured while trying to connect to TS3 Query!")
        console.error(e)
    });
};

module.exports = utility;