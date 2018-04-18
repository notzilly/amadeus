var Discord = require('discord.io');
var auth = require('./auth.json');
var helper = require('./helpers.js');

// Gets instance of logger from helpers
var logger = helper.logger; 

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {

            case 'ping':           // !ping
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;

            case 'begone':         // !begone
                bot.sendMessage({
                    to: channelID,
                    message: 'BEGONE!',
                    tts: true,
                    embed: {
                        image: {
                            url: 'https://i.ytimg.com/vi/KpqX_WEpya8/hqdefault.jpg'
                        }
                    }
                });
                break;

            case 'catgirl':       // !catgirl
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        image: {
                            url: helper.getCatGirl()
                        }
                    }
                }); 
                break;
                
            default:
                break;
        }
        logger.info('Message received: ' + message);
    }
});