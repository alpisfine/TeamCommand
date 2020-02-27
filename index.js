#!/usr/bin/env node
var argv = require('yargs')
    .boolean(['v'])
    .argv;
const config = require("./config.json");
var path = require('path');
var utility = require('./utility.js');
(function () {
    const fs = require("fs");
    var files = fs.readdirSync("./plugins");
    files.forEach(file => {
        if (path.extname(file) != '.js') return;
        var plugin;
        try {
            log("Loading plugin: " + file);
            plugin = require("./plugins/" + file);
            utility.registeredPlugins.push({ name: plugin.name, description: plugin.description, command: plugin.command })
            initPlugin(plugin);
        } catch (e) {
            log("Error while requiring a new plugin: " + file, false);
            console.log(e);
        }
    });

    utility.initHelp(config);

})();

function initPlugin(plugin) {
    let modulePromises = [];
    plugin.requireModules.forEach(mod => {
        try {
            modulePromises.push(require("./modules/" + mod).getPromise(plugin,config));
        } catch (e) {
            log("Error while pushing requiring " + mod);
            console.error(e);
        }
    });

    Promise.all(modulePromises).then(mods => plugin.main(...mods)).catch(e => console.error(e));
}

//Log Function
// Actually, this function might be broken because argv.v is always resolved to boolean as true ??? not sure though.
function log(msg, verbose) { //if verbose parameter is true then this would print. Even if there is no v flag (which stands for verbose).
    if (!verbose) {
        console.log(msg);
        return;
    }
    if (argv.v) console.log(msg);
}