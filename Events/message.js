module.exports = class {
    constructor(client) {
        this.client = client;
    }
    /**
     * Message event fired upon message send in a Discord channel.
     * @param {Discord.Message} message Object representing message on Discord
     */
    run(message) {
        message = message[0];

        if(message.author.bot || !message.content.startsWith(this.client.config.prefix)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift().slice(this.client.config.prefix.length);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        if(!cmd) return;
        if(cmd.cooldown.has(message.author.id)) return message.delete();

        cmd.setMessage(message);
        cmd.run(message, args);
        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
}