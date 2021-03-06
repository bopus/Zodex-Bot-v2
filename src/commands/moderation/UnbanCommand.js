const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  run(client, message, args) {
    message.channel.send('unban command works');
  }
}