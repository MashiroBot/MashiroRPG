const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
let xp = require("./data/jsons/xp.json");
const cfg = require("./data/cfg.js");
const tokenfile = cfg.token;
let currency = require("./data/jsons/currency.json");
const prefix = cfg.prefix;
bot.commands = new Discord.Collection();
const mentionHook = cfg.webhook;
let inv = require("./data/jsons/inventory.json");
let invusers = require("./data/jsons/invusers.json");

//BEGIN
//FS.READDIR (ЧИТАЕТ КОМАНДЫ.)

fs.readdir("./data/cmd/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Модули не найдены или их нет.");
      return;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./data/cmd/${f}`);
      console.log(`Модуль ${f} загружен.`);
      bot.commands.set(props.help.name, props);
    });
  });

//
//
//INTERVAL BOT.SETACTIVITY
//
//

  bot.on("ready", async () => {

      console.log(`${bot.user.username} онлайн на ${bot.guilds.size} серверах`);
      var botsetactivity = setInterval(function() {
        bot.user.setActivity(`r.help`, {type: "WATCHING"})
		setTimeout(function() {
		bot.user.setActivity(`голосовые каналы на ${bot.guilds.size} сервере(ах)`, {type: "LISTENING"})
		}, 30000);
      }, 60000);


    });

    //with ${bot.guilds.size} servers} //пометка

//
//
//BASE CMD HELP
//
//

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(message.content === `${prefix}help`) {
    const embed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setColor("#33CCFF")
    .setDescription("Команд нет, поскольку бот еще не вышел на версию 0.44")
    message.channel.send(embed)
    const recent = new Discord.RichEmbed()
    .setAuthor('MashiroRPG отклик', bot.user.displayAvatarURL)
    .setColor("#33CCFF")
    .addField("Использована команда", "***r.help***")
    .addField("Использована пользователем", `пользователь ***${message.author.username} (${message.author})***`)
    .addField("Канал", `Канал ${message.channel}`)
    .addField("Использована на сервере", `**${message.guild.name}** с ID: ${message.guild.id}`)
    .setFooter("WebHook by Douddle", bot.user.displayAvatarURL)
    mentionHook.send(recent);
  };


});

//
//
//XP
//
//

bot.on("message", async message => {
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

  fs.writeFile("./data/jsons/xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
      })

});

//
//
//GUILD CREATE AND GUILD DELETE
//
//

bot.on("guildCreate", guild => {
  const cembed = new Discord.RichEmbed()
  .setAuthor("Новый сервер", bot.user.displayAvatarURL)
  .setColor("#33CCFF")
  .addField("Название сервера", guild.name)
  .addField("Количество участников", guild.memberCount + " участника(ов)")
  .addField("Создатель сервера", guild.owner)
  .setFooter("Webhook by Douddle", bot.user.displayAvatarURL)
  mentionHook.send(cembed);
});

bot.on("guildDelete", guild => {
  const cembed = new Discord.RichEmbed()
  .setAuthor("Сервер удален", bot.user.displayAvatarURL)
  .setColor("#33CCFF")
  .addField("Название сервера", guild.name)
  .addField("Количество участников", guild.memberCount + " участника(ов)")
  .addField("Создатель сервера", guild.owner)
  .setFooter("Webhook by Douddle", bot.user.displayAvatarURL)
  mentionHook.send(cembed);
});

//
//
//CURRENCY
//
//

bot.on("message", async message => {
  if(message.content === `${prefix}currency`) {
  if(!currency[message.author.id]){
   currency[message.author.id] = {
     currency: 0,
     user: message.author.username,
     id: message.author.id
  };
}

let curcur = currency[message.author.id].currency;

const embed = new Discord.RichEmbed()
.setDescription(`Статистика ${message.author.username}`, bot.user.displayAvatarURL)
.setColor("#3FC24F")
.addField("Счет", curcur + "<:rublik:481212898279161866>")
.setFooter(`Запрос от ${message.author.username}`);

fs.writeFile("./data/jsons/currency.json", JSON.stringify(currency), (err) => {
      if(err) console.log(err)
    });

    message.channel.send(embed);
      const recent = new Discord.RichEmbed()
        .setAuthor('MashiroRPG отклик', bot.user.displayAvatarURL)
        .setColor("#33CCFF")
        .addField("Использована команда", "***r.currency***")
        .addField("Использована пользователем", `пользователь ***${message.author.username} (${message.author})***`)
        .addField("Канал", `Канал ${message.channel}`)
        .addField("Использована на сервере", `**${message.guild.name}** с ID: ${message.guild.id}`)
        .setFooter("WebHook by Douddle", bot.user.displayAvatarURL)
        mentionHook.send(recent);
}

});

//
//
//INVENTORY
//
//

bot.on("message", async message => {
  if(!inv[message.author.id]){
   inv[message.author.id] = {
     inv: 0,
  };
}

fs.writeFile("./data/jsons/invusers.json", JSON.stringify(inv), (err) => {
  if(err) console.log(err)
    })

  var invuser = inv[message.author.id].inv;

  if(message.content === `${prefix}inventory`) {
    if(invuser = "0") {
      message.reply("у тебя ничего нет.")
    }
  if(invuser = "0") {
  const embed = new Discord.RichEmbed()
  .setAuthor(`Инвентарь ${message.author.username}`, message.author.displayAvatarURL)
  .setColor("#33CCFF")
  .addField("Инвентарь:", invuser)
  .setFooter(`Вещи можно получить убивая боссов.`);
    message.channel.send(embed)
    }
  }
});

//
//
//
//
//

bot.login(tokenfile)
