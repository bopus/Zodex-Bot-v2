const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.").then(deleteMessages);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bot does not have the required permissions to use this command.").then(deleteMessages);

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('816513027607756801');
    const memberRole = message.guild.roles.cache.get('817875564060475404');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const deleteMessages = msg => msg.delete({timeout: 7000}).then(message.delete({timeout: 7000}));
    const taggedUser = message.mentions.users.first();
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for mute: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();
    const publicMuteEmbed = new Discord.MessageEmbed()
      .setTitle(`${taggedUser.username} has been muted.`)
      .setDescription(`Reason for mute: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.mute @user reason\``).then(deleteMessages);
    if (!mentionedMember) return message.channel.send('The user you have mentioned is not in this sever.').then(deleteMessages);
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Cannot mute yourself.').then(deleteMessages);
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Zodex Bot cannot be muted.').then(deleteMessages);
    if (!reason) reason = "No reason was provided.";
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This user is already muted.').then(deleteMessages);
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('User cannot be muted.').then(deleteMessages);

    await message.channel.send(publicMuteEmbed).catch(err => console.log(err)).then(deleteMessages);
    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not give the mute role.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not remove the member role.')));
  }
}