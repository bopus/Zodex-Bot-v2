const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'info', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
   .setTitle('Bot Help Sections')
   .setDescription('Use .help section Name to access another section.\nSections:\ninformation\nfun\nmoderation\ntool')
   .addField('Fun Commands', 'Commands that all users can use that are for fun.')
   .addField('Information commands', 'Commands that return some form of important imformation.')
   .addField('Moderation commands', 'Commands that are for moderation purposes within a server.')
   .addField('Tool commands', 'Commands that add features to a server.')
   .setFooter(client.user.tag, client.user.displayAvatarURL())
   .setColor("#c377e0");
 
const infoEmbed = new Discord.MessageEmbed()  
   .setTitle('Information Commands.')
   .addField('Help Commands', 'This commands shows the user all the commands possable.')
   .setColor("#c377e0");



 
const funEmbed = new Discord.MessageEmbed()
   .setTitle('Fun Commands.')
   .addField('Avatar Command', 'Returns a users avatar.')
   .addField('Meme Commands', 'Returns a Meme to the channel.')
   //.addField('Say Command', 'Make the bot say a message to the channel.')
   .addField('Snipe Command', 'Returns the last deleted message within a channel.')
   .addField('Suggest Command', 'Creates a suggestion.')
   .setColor("#c377e0");
 
const moderationEmbed = new Discord.MessageEmbed()
   .setTitle('Moderation Commands.')
   .addField('Ban Command', 'Bans a member from the server')
   .addField('Kick Command', 'Kicks a member from the server')
   .addField('Lock Command', 'Locks a channel in the server')
   .addField('Mute Command', 'Mutes a member in the server')
   //.addField('Nickname Command', 'Changes a members nickname in a server')
   //.addField('Nuke Command', 'Clones a channel and deletes the old one.')
   //.addField('Purge Command', 'Purges messages within a channel')
   //.addField('Recruit Command', 'Recruits a member to the staff team in a server')
   //.addField('Tempban Command', 'Tempbans a member from the server')
   .addField('Tempmute Command', 'Tempmutes a member in a server')
   .addField('Unban Command', 'Unbans a member from the server')
   .addField('Unlock Command', 'Unlocks a channel in the server')
   .addField('Unmute Command', 'Unmutes a member in a server')
   .setColor("#c377e0");
 
const toolEmbed = new Discord.MessageEmbed()
   .setTitle('Tool Commands.')
   .addField('this section is currently empy.')
   .setColor("#c377e0");
 
if (!args[0]) return message.channel.send(sectionEmbed);
if (args[0] == 'information') return message.channel.send(infoEmbed);
else if (args[0] == 'fun') return message.channel.send(funEmbed);
else if (args[0] == 'tool') return message.channel.send(toolEmbed);
else if (args[0] == 'moderation') return message.channel.send(moderationEmbed);
  }
}