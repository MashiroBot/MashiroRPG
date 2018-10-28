const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {


// This will create the webhook with the name "Example Webhook" and an example avatar.
message.channel.createWebhook("Example Webhook", "https://i.imgur.com/p2qNFag.png")
// This will actually set the webhooks avatar, as mentioned at the start of the guide.
.then(webhook => webhook.edit("Example Webhook", "https://i.imgur.com/p2qNFag.png")
// This will get the bot to DM you the webhook, if you use this in a selfbot,
// change it to a console.log as you cannot DM yourself
.then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))

}

module.exports.help = {
  name: "webhook"
}
