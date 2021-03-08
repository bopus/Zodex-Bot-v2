const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SnipeCommand extends BaseCommand {
  constructor() {
    super('snipe', 'fun', []);
  }

  run(client, message, args) {
    message.channel.send('snipe command works');
  }
}