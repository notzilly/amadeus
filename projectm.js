var Discord = require('discord.io');
var logger = require('winston');
var request = require('request');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize custom header for http requests
var requestOpts = {
    url: 'https://api.imgur.com/3/album/qK8HH/images',
    headers: {
        'Authorization': 'Client-ID ' + auth.client_id
    }
}

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
                var link = '';
                var links = new Array();
                request.get(requestOpts, function(err, res, body){
                    
                    let imagesJSON = JSON.parse(body).data; // Creates JSON of images
                    let imagesArray = Object.keys(imagesJSON).map(function(k) { return imagesJSON[k] }); // Converts JSON into array
                    
                    imagesArray.map(function(image){
                        links.push(image.link);
                    });

                    link = links[Math.floor(Math.random() * links.length)]; // Random link
                    
                    bot.sendMessage({
                        to: channelID,
                        embed: {
                            image: {
                                url: link
                            }
                        }
                    });

                });  
                break;
                
            default:
                break;
        }
        logger.info('Message received: ' + message);
    }
});