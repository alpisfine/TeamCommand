const plugin = {
    name:"music",
    description:"Toggle channel quality for music listening and voip!",
    type:"command",
    command:"!music",
    requireModules:["ts3"],
    activeServerId:22
    }
    
    plugin.main = function(teamspeak){
        teamspeak.registerEvent("textchannel");
        teamspeak.registerEvent("textserver");
        teamspeak.registerEvent("textprivate");
    
        teamspeak.on("textmessage", ev =>{
            if(!ev.msg.startsWith(plugin.command)) return;
           teamspeak.getChannelByID(ev.invoker.cid).then(channel=>{
            if(channel.codec == 4) channel.edit({channel_codec: 5});
            else if(channel.codec == 5) channel.edit({channel_codec: 4});
            else{
                teamspeak.sendTextMessage(ev.invoker.clid,ev.targetmode,"Misconfiguration Detected");
            }
           });
        });
    
    }
    
    module.exports = plugin;