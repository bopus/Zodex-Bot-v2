const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send ("You do not have the requirements to use this command.").then(msg => msg.delete({timeout: 7000}));
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason was provided";
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    // .kick @user reason
    if (!args[0]) return message.channel.send("You need to mention a user to kick. \`.kick @user reason\`").then(msg => msg.delete({timeout: 7000}));
    if (!mentionedMember) return message.channel.send("The member your tried to mention is not in the server.").then(msg => msg.delete({timeout: 7000}));
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log(`Unable to message the member.`);
    }

    try {
      await mentionedMember.kick(reason);
    } catch (err) {
      console.log(err);
      return message.channel.send("Unable to kick user mentioned.");
    }
  }
}