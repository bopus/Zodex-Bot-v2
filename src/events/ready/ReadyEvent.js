const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {
    console.log(client.user.tag + ' has logged in.');
    // Set the client user's presence
    client.user.setPresence({ activity: { name: '.help', type: "PLAYING" }, status: 'online' })
      .catch(console.error);
  }
}