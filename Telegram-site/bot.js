const fs = require('fs');
const TeleBot = require('telebot');
var textString = ""
var nextorspace = " "

const bot = new TeleBot({
    token: "Use Token Here!"
});

function changeHTML () {
  fs.writeFile("./htmlchange.js", "document.getElementById('htmltext').innerHTML = '" + textString + "';setTimeout(function(){location.reload()}, 100);", function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
}

bot.on(/(.+)/, function (msg, props) {
  var text = props.match[1];
  if (/^\/[Nn]ext (.+)/.test(text)) {
    nextorspace = "<br>"
    text = text.replace("/next ", "");
  } else {
    nextorspace = " "
  }

  if (/^\/[Ss]how/.test(text)) {
    console.log(textString);
    return bot.sendMessage(msg.from.id, textString);
  }
  
  textString += (nextorspace + text);
  changeHTML("")
  console.log(" ")
  console.log(text)

  bot.sendMessage(msg.from.id, text + ", " + msg.from.first_name);
  
  return 
  
});

bot.on(/^\/clear/, function (msg, props) {
  textString = ""
  fs.writeFile("./htmlchange.js", "setTimeout(function(){location.reload()}, 100);", function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
  return bot.sendMessage(msg.from.id, "Cleared!");
});

bot.start();
