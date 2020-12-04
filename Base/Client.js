const { Client, Collection } = require('discord.js');
const { readdir } = require('fs');

exports.Client = class extends Client {
    /**
     * Constructor for modified Discord.Client
     * @param {Object} options Command configuration and options. Includes name, cooldown, and aliases.
     */
    constructor(options) {
        super(options.clientOptions || {});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = options.config ? require(`../${options.config}`) : {};
        this.permissions = options.perms ? require(`../${options.perms}`) : {};
        /* set up commands and events */
        this.loadCommands(this.config.paths.commands);
        this.loadEvents(this.config.paths.events);
    }
    /* commands must be located in the directory specified in config.json */
    loadCommands(path) {
        readdir(path, (error, files) => {
            if(error)
                console.log(error);
            files.forEach(cmd => {
                const command = new (require(`../${path}/${cmd}`))(this);
                this.commands.set(command.help.name, command);
                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });
        return this;
    }
    /* events must be located in the directory specified in config.json */
    loadEvents(path) {
        readdir(path, (error, files) => {
            if(error)
                console.log(error);
            files.forEach(evt => {
                const event = new (require(`../${path}/${evt}`))(this);
                super.on(evt.split('.')[0], (...args) => event.run(args));
            });
        });
        return this;
    }
    run() {
        super.login(this.config.token);
        return this;
    }
};