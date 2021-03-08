const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super('suggest', 'fun', []);
  }

  async run(client, message, args) {
    let suggestion = args.join(' ');
    if (!args[0]) return message.channel.send('You need to declare something');
    const embed = new Discord.MessageEmbed()
      .setTitle(`Suggestion:`)
      .addField(`Suggestion: ${suggestion}`, `Suggested by ${message.author.tag}.`);

    message.channel.send(embed).then(sentMessage => sentMessage.react('👍')).then(reaction => reaction.message.react('👎'));
  }
}