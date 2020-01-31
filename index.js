#!/usr/bin/env node
var argv = require('yargs')
    .boolean(['v'])
    .argv;
const config = require("./config.json");
var path = require('path');

(function () {
    const fs = require("fs");
    var files = fs.readdirSync("./plugins");
    var pluginArr = [];
    files.forEach(file => {
        if (path.extname(file) != '.js') return;
        var plugin;
        try {
            log("Loading plugin: " + file)
            plugin = require("./plugins/" + file);
            initPlugin(plugin,pluginArr);
        } catch (e) {
            log("Error while requiring a new plugin: " + file, false);
            console.log(e);
        }
    });
})();


log("Connecting to TS3 Query Server", true);

function initPlugin(plugin,array) {
    var handle = false;
    for(let i=0;i<array.length;i++){
        if(array[i] && (array[i].sid == plugin.activeServerId)){
            handle = array[i].handle;
            break;
        }
    }
    
    if(!handle){
        const { TeamSpeak } = require("ts3-nodejs-library");
        TeamSpeak.connect({
            host: config.Query.host,
            queryport: config.Query.port, //optional
            //serverport: 9987,
            username: config.Query.username,
            password: config.Query.password,
            nickname: "test"
        }).then(async teamspeak => {
            teamspeak.useBySid(plugin.activeServerId).then(async () => {
                plugin.main(teamspeak);
            });
    
        }).catch(e => {
            console.log("An error occured while trying to connect to TS3 Query!")
            console.error(e)
        });

        array.push({sid:plugin.activeServerId,handle:TeamSpeak})

    }else{
        plugin.main(handle);
    }
}

//Log Function
function log(msg, verbose) {
    if (!verbose) {
        console.log(msg);
        return;
    }
    if (argv.v) console.log(msg);
}