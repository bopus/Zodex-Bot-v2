const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.");
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bot does not have the required permissions to use this command.");

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('816513027607756801');
    const memberRole = message.guild.roles.cache.get('817875564060475404');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const taggedUser = message.mentions.users.first();
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setColor("#c377e0")
      .setTimestamp();
    const publicUnmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`${taggedUser.username} has been unmuted.`)
      .setColor("#c377e0")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.unmute @user reason\``);
    if (!mentionedMember) return message.channel.send('The user you have mentioned is not in this sever.');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Cannot mute yourself.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Zodex Bot cannot be muted.');
    if (!reason) reason = "No reason was provided.";
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This user is already unmuted.');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('User cannot be unmuted.');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await message.channel.send(publicUnmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not give the member role.')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not remove the mute role.')));
  }
}