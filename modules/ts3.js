const mod = {
    name: "ts3",
    description: "Teamspeak3 server query support!"
}

mod.getPromise = function (plugin,config) {
    return new Promise(function (resolve, reject) {
        const { TeamSpeak } = require("ts3-nodejs-library");
        TeamSpeak.connect({
            host: config.Query.host,
            queryport: config.Query.port, //optional
            //serverport: 9987,   //Commented out because of useBySid line:17
            username: config.Query.username,
            password: config.Query.password,
            nickname: "test" // Doesn't work anyways
        }).then(async teamspeak => {
            teamspeak.useBySid(plugin.activeServerId).then(async () => {
                resolve(teamspeak);
            }).catch(e => reject(e));
        }).catch(e => reject(e));
    });
}

module.exports = mod;