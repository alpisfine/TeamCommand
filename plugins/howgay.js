const TARGET_MODE = { server: 3, channel: 2, private: 1 }

const plugin = {
    name: "howgay",
    description: "Get your percentage of how much gay you are!",
    type:"command",
    command:"!howgay",
    activeServerId: 22
}

plugin.main = function (teamspeak) {
    teamspeak.registerEvent("textchannel");
    teamspeak.registerEvent("textserver");
    teamspeak.registerEvent("textprivate");

    teamspeak.on("textmessage", ev => {
        if (!ev.msg.startsWith(plugin.command)) return;
        var answer = ev.invoker.nickname + " is %" + Math.ceil(Math.random() * 100) + " gay!";
        teamspeak.sendTextMessage(ev.invoker.clid, ev.targetmode, answer)
    });

}

module.exports = plugin;