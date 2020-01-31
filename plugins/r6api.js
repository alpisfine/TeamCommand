const plugin = {
    name: "R6ApiChannelNames",
    description: "Set channel names with r6 data!",
    activeServerId: 22,
    args: {
        channels: [
            {
                channelId: 10933,
                channelId2: 10934,
                userName: "FC_Joker"
            },{
                channelId: 10935,
                channelId2: 10936,
                userName: "Haci.Yatmaz"
            },{
                channelId: 10937,
                channelId2: 10938,
                userName: "FC_Auvuave"
            },{
                channelId: 10939,
                channelId2: 10940,
                userName: "FC_Nyakuza"
            },{
                channelId: 10941,
                channelId2: 10942,
                userName: "Mr.Punk19....."
            }
        ]
    }
}

plugin.main = function (teamspeak) {
    tick();
    setInterval(tick, 600000); // 10 minutes Intervals
    function tick(){
        const config = require("../config.json");
        var R6API = require('r6api.js');
        var r6api = new R6API(config.R6Api.email, config.R6Api.password);
        var arr = plugin.args.channels;
        for (let i=0; i< arr.length; i++) {
            r6api.getId("uplay", arr[i].userName).then(usr => {
                r6api.getStats("uplay", usr[0].id).then(el => {
                    var stats = el[0];
                    updateChannelName(teamspeak,stats,arr[i])
                });
            });
        }
    }
}

function updateChannelName(ts,stats,el){
    var kd = stats.pvp.general.kills / stats.pvp.general.deaths;
    var wl = stats.pvp.general.wins / stats.pvp.general.losses;
    var playtime = Math.floor(stats.pvp.general.playtime/3600);
    var line1 = `[lspacer]${el.userName} Playtime: ${playtime}hr`;
    var line2 = `[lspacer]K/D: ${kd.toFixed(2)} W/L: ${wl.toFixed(2)}`;
    ts.getChannelByID(el.channelId).then(channel =>{
        channel.edit({channel_name:line1});
    });
    ts.getChannelByID(el.channelId2).then(channel =>{
        channel.edit({channel_name:line2});
    });
}

module.exports = plugin;