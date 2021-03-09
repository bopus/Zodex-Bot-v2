const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms =require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have the required permissions.').then(deleteMessages);
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('Zodex Bot requires \`MANAGE_ROLES\` permissons.').then(deleteMessages);

    const muteRole = message.guild.roles.cache.get('816522515849281578');
    const memberRole = message.guild.roles.cache.get('709566762714398851');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const taggedUser = message.mentions.users.first();
    const deleteMessages = msg => msg.delete({timeout: 7000}).then(message.delete({timeout: 7000}));
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You were muted in ${message.guild.name}.`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();
    const publicTempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`${taggedUser} has been temp muted.`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();
    
    if (!args[0]) return message.channel.send('You need to declare a user, time and reason. \`.tempmute @user time reason\`').then(deleteMessages);
    if (!mentionedMember) return message.channel.send('That user is not in this server.').then(deleteMessages);
    if (!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('That user cannot be muted').then(deleteMessages);
    if (!time) return message.channel.send('You need to declare a duration of time. \`.tempmute @user time reason\`').then(deleteMessages);
    if (!reason) reason = 'No reason was provided';

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err));
    await message.channel.send(publicTempmuteEmbed).catch(err => console.log(err)).then(deleteMessages);

    setTimeout(async function () {
      await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err));
      await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err));
      await mentionedMember.send(`You have been unmuted in ${message.guild.name}`).catch(err => console.log(err));
    }, ms(time));
  }
}