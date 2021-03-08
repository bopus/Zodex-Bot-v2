const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checks
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot does not have the requires permissions to use this command.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    //Variables
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();
    //Input Checks
    if (!reason) reason = "No reason was provided.";
    if (!args[0]) return message.channel.send("You must mention a user to ban. \`.ban @user reason\`").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!mentionedMember) return message.channel.send("That user does not exist in this server.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!mentionedMember.bannable) return message.channel.send("That user is not bannable.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    //Executing
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .setDescription(`Banned for: ${reason}`)
      .setColor("#c377e0")
      .setTimestamp();

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send(mentionedMember.user.tag + " has been banned")).then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
  }
}