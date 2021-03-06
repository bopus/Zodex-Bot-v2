const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super('clear', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the required permissions to use this command.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Zodex Bot does not have \`MANAGE_MESSAGES\` permissions.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!args[0]) return message.channel.send("You need to state the amount of messages that must be cleared. \`.clear number\`").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send("Please state a valid number.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!Number.isInteger(amountToDelete)) return message.channel.send("You need to state a whole number.").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send("Please enter a number that is between 2 and 100").then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    const fetched = await message.channel.messages.fetch ({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(`Deleted ${messages.size} messages`)).then(msg => msg.delete({timeout: 7000}));
    } catch (err) {
      console.log(err);
      message.channel.send(`Unable to delete the messages. Please Make sure the messages are 14 days old or less`).then(msg => msg.delete({timeout: 7000})).then(message.delete({timeout: 7000}));
    }
  }
}