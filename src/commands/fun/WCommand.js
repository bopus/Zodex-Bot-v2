const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class WCommand extends BaseCommand {
  constructor() {
    super('w', 'fun', []);
  }

  async run(client, message, args) {
    message.channel.send('https://cdn.discordapp.com/attachments/806321228079693824/818650165832712212/zodex.PNG');
  }
}