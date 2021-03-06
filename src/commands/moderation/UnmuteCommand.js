const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.").then(deleteMessages);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("Bot does not have the required permissions to use this command.").then(deleteMessages);

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('816522515849281578');
    const memberRole = message.guild.roles.cache.get('709566762714398851');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const taggedUser = message.mentions.users.first();
    const deleteMessages = msg => msg.delete({timeout: 7000}).then(message.delete({timeout: 7000}));
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setColor("#c377e0")
      .setTimestamp();
    const publicUnmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`${taggedUser.username} has been unmuted.`)
      .setColor("#c377e0")
      .setTimestamp();

    if (!args[0]) return message.channel.send(`\`.unmute @user reason\``).then(deleteMessages);
    if (!mentionedMember) return message.channel.send('The user you have mentioned is not in this sever.').then(deleteMessages);
    if (mentionedMember.user.id == message.author.id) return message.channel.send('Cannot mute yourself.').then(deleteMessages);
    if (mentionedMember.user.id == client.user.id) return message.channel.send('Zodex Bot cannot be muted.').then(deleteMessages);
    if (!reason) reason = "No reason was provided.";
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This user is already unmuted.').then(deleteMessages);
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('User cannot be unmuted.').then(deleteMessages);

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await message.channel.send(publicUnmuteEmbed).catch(err => console.log(err)).then(deleteMessages);
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not give the member role.')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('ERROR 404: Could not remove the mute role.')));
  }
}