import logger from 'winston';
import auth from './auth.json';
import request from 'request';

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

var requestOpts2 = {
    url: 'https://api.imgur.com/3/album/vLcaq/images',
    headers: {
        'Authorization': 'Client-ID ' + auth.client_id
    }
}


// Get request for catgirl images  
var images = Array();
logger.info('Fetching catgirls');
request.get(requestOpts, function(err, res, body){
    
    let imagesJSON = JSON.parse(body).data; // Creates JSON of images
    images = imagesJSON.map(image => { return image.link }); // Maps links from images

    logger.info('Catgirls fetched');
});

var baits = Array();
logger.info('Fetching baits');
request.get(requestOpts2, function(err, res, body){
    
    let imagesJSON = JSON.parse(body).data; // Creates JSON of baits
    baits = imagesJSON.map(image => { return image.link }); // Maps links from baits

    logger.info('Baits fetched');
});

// Exports getCatgirl
export function getCatGirl() {
    return images[Math.floor(Math.random() * images.length)];
}

// Exports getBait
export function getBait() {
    return baits[Math.floor(Math.random() * baits.length)];
}

// Exports logger
const _logger = logger;
export { _logger as logger };
