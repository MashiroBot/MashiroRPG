const Discord = require("discord.js")
var { mypostgresdb } = require("../cfg.js");
var { Client } = require("pg");
const cfg = require("../cfg.js")

module.exports.run = async (bot, message, args, tools) => {
  const user = message.author.id;

  var client = new Client({
    connectionString: mypostgresdb,
  });

if(!message.content.startsWith(cfg.prefix)) return;

      bot.on("error", (err, client) => {
          return console.error("Неожиданная ошибка в подключении к базе данных", err)
      });

      client.connect();

      if(!user){
          user = {
            xp: 0,
            level: 1
          };
        }

        let curxp = user.xp;
        let curlvl = user.level;
        let nxtLvl = 1500 + 1500 / 4.0 * (user.level - 1);

        const embed = new Discord.RichEmbed()
        .setDescription(bot.user.username, bot.user.displayAvatarURL)
        .setColor("#33CCFF")
        .addField("CURRENT LVL", curlvl)

        message.channel.send(embed)

};

module.exports.help = {
  name: "stats"
}
