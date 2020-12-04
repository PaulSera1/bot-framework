const Command = require('../Base/Command');

module.exports = class extends Command {
    /**
     * Sample command code that responds to prefix + "test".
     * @param {Client} client
     */
    constructor(client) {
        super(client, { // options for command
            name: 'test',
            description: 'sample for simple command',
            usage: '',
            category: 'test',
            cooldown: 5000,
            aliases: ['Test', 'TEST'],
            permLevel: 0,
            permission: 'READ_MESSAGES',
            deleteCommands: false
        });
    }
    run(message) {
        super.respond(`<@${message.author.id}> hello!`);
    }
}