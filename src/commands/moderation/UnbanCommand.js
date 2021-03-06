const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checks
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have the required permissions to use this command.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot does not have the requires permissions to use this command.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    //Variables
    let reason = args.slice(1).join(" ");
    let userID = args[0];
    //Input Checks
    if (!reason) reason = "No reason was provided.";
    if (!args[0]) return message.channel.send("You must mention a user to unban. \`.unban ID reason\`").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!isNaN(args[0])) return message.channel.send("Please enter a valid user ID. \`.unban ID reason\`").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    //Executing
   message.guild.fetchBans().then(async bans => {
     if (bans.size == 0) return message.channel.send("There are currently no bans in this sever.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
     let bannedUser = bans.find(b => b.user.id == userID);
     if (!bannedUser) return message.channel.send("That user ID is not banned from this server").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
     await message.guild.members.unban(bannedUser.user, reason).catch(err => {
       console.log(err);
       return message.channel.send("ERROR 404: something went wrong with unbanning that user ID.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
     }).then(() => {
       message.channe.send(`Unbanned ${arg[0]}`);
     });
   });

  }
}