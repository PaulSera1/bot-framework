module.exports = class {
    constructor(client, options) {
        this.client = client;
        this.help = {
            name: options.name || null,
            description: options.description || 'No information provided',
            usage: options.usage || '',
            category: options.category || 'Information'
        };
        this.conf = {
            deleteCommands: options.deleteCommands || false,
            permLevel: options.permLevel || 0,
            permission: options.permission || 'SEND_MESSAGES',
            cooldown: options.cooldown || 1000,
            aliases: options.aliases || [],
            allowDMS: options.allowDMS || false
        };
        this.cooldown = new Set(); // user-based cooldown
    }
    startCooldown(user) {
        this.cooldown.add(user);
        setTimeout(() => this.cooldown.delete(user), this.conf.cooldown);
    }
    setMessage(message) {
        this.message = message;
    }
    async respond(message) {
        await this.message.channel.send(message).catch(error => console.log(error));
        if(this.conf.deleteCommands)
            await this.message.delete();
    }
};