const Discord = require("discord.js");
const fs = require('fs');
let xp = require("../xp.json")
const cfg = require("../cfg.js")
const mentionHook = cfg.webhook;

module.exports.run = async (bot, message, args) => {


    if(!xp[message.author.id]){
     xp[message.author.id] = {
       xp: 0,
       level: 1
    };
  }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = curlvl * 500;
    let difference = nxtLvl - curxp;
    if(curxp === nxtLvl) {
      nxtLvl === curlvl + 100
    }

    let xpAdd = Math.floor(Math.random() * 0) + 0;
          console.log(xpAdd);


  const embed = new Discord.RichEmbed()
  .setAuthor("Уровень", bot.user.displayAvatarURL)
  .setColor("#2CF43C")
  .setDescription(`**Текущий уровень**: ${curlvl}\n\n**Опыт**: ${curxp}\n\n**Опыта до след. уровня**: ${difference}`);

  fs.writeFile("../xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    })

  message.channel.send(embed);
  const recent = new Discord.RichEmbed()
  .setAuthor('MashiroRPG отклик', bot.user.displayAvatarURL)
  .setColor("#33CCFF")
  .addField("Использована команда", "***r.level***")
  .addField("Использована пользователем", `пользователь ***${message.author.username} (${message.author})***`)
  .addField("Канал", `Канал ${message.channel}`)
  .addField("Использована на сервере", `**${message.guild.name}** с ID: ${message.guild.id}`)
  .setFooter("WebHook by Douddle", bot.user.displayAvatarURL)
  mentionHook.send(recent);

}

module.exports.help = {
  name: "level"
}
