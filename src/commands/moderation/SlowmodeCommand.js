const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have the required permissons.");
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Bot Requires \`MANAGE_CHANNELS\` permissions.');

    const value = Number(args[0]);

    if (!args[0]) return message.channel.send('You must input a number that states how long a channel will be set in slowmode.')
    if(!value > 21600) return message.channel.send('You must input a number that is between 0 and 21600.');
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(`Slowmode for ${message.channel} has been set to ${value} seconds.`);
    } catch (err) {
      console.log(err);
      message.channel.send('ERROR 404: Could not set slowmode. Please contact BOPUS on discord');
    }
  }
}