/**
 * Entry point for the bot.
 * Make sure the configuration specified in config.json contains accurate paths and a valid token.
 * Note: default client does not support Intents.
 */

const { Client } = require('./Base/Client');

class Bot extends Client {
    constructor(...args) {
        super(...args);
    }
}

const bot = new Bot({config: './config.js'});

bot.run();