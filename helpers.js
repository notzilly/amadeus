var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');

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

// Get request for catgirl images  
var images = Array();
request.get(requestOpts, function(err, res, body){
    
    logger.info('Fetching catgirls');
    
    let imagesJSON = JSON.parse(body).data; // Creates JSON of images
    let imagesArray = Object.keys(imagesJSON).map(function(k) { return imagesJSON[k] }); // Converts JSON into array
    
    imagesArray.map(function(image){
        images.push(image.link);
    });

    logger.info('Catgirls fetched');
});

// Exported functions
var functions = {};

// Return a pseudo random catgirl image link
functions.getCatGirl = function() {    
    return images[Math.floor(Math.random() * images.length)];
}

module.exports = functions;