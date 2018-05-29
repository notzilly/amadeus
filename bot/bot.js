import Discord from 'discord.io';
import auth from '../auth.json';
import logger from 'winston';
import { CatGirl } from './CatGirl.js';
import { Bait } from './Bait.js';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize catgirl object
let catGirl = new CatGirl('https://api.imgur.com/3/album/qK8HH/images', logger);
catGirl.loadImagesFromAlbum();

// Initialize bait object
let bait = new Bait('https://api.imgur.com/3/album/vLcaq/images', logger);
bait.loadImagesFromAlbum();

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
                            url: catGirl.getRandomImage()
                        }
                    }
                }); 
                break;
                
            case 'b8':           // !b8
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        image: {
                            url: bait.getRandomImage()
                        }
                    }
                }); 
                break;

            default:
                break;
        }
        logger.info('Message received: ' + message);
    } else {

        //If someone says amadeus or kurisutina in chat, reply with proper answer
        if(message.search(/.+(k|K)urisutina.+/g) > -1 || message.search(/.+(a|A)madeus.+/g) > -1){
            logger.info('Amadeus or Kurisutina spotted in chat');
            bot.sendMessage({
                to: channelID,
                message: '~TINA MO KINSHII!',
                embed: {
                    image: {
                        url: 'http://i.imgur.com/vtNaFDQ.gif'
                    }
                }
            });
        }

    }
});
