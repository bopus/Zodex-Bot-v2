const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bot does not have the required permissions to use this command.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('816513027607756801');
    const memberRole = message.guild.roles.cache.get('817875564060475404');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for mute: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.mute @user reason\``);
    if (!mentionedMember) return message.channel.send('The user you have mentioned is not in this sever.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Cannot mute yourself.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Zodex Bot cannot be muted.');
    if (!reason) reason = "No reason was provided.";
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This user is already muted.');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('User cannot be muted.');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not give the mute role.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not remove the member role.')));
  }
}