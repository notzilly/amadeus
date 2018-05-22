import { Request } from './Request.js';

export class CatGirl {

    constructor(url, logger){ // Constructor
        this.request = new Request(url); // Request object
        this.images = undefined; // Images
        this.logger = logger; // Logger
    }

    loadImagesFromAlbum() { // Load images from album using Request object
        this.logger.info('Fetching catgirls');
        this.request.getAlbum().then(response => {
            this.images = response; // If promise resolves, populates catgirl array
            this.logger.info('Catgirls fetched');
        }).catch(err => this.logger.warn('Error fetching catgirls'));
    }

    getRandomImage(){ // Gets random catgirl image from images array
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}
