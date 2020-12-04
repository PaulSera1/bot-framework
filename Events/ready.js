module.exports = class {
    /**
     * Ready event fired after bot connects to gateway.
     * @param {Client} client Modified Discord.Client found in Base/Client.js
     */
    constructor(client) {
        this.client = client;
    }
    async run() {
        console.log('ready');
    }
}