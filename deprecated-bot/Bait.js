import { Request } from './Request.js';

export class Bait {

    constructor(url, logger){ // Constructor
        this.request = new Request(url); // Request object
        this.images = undefined; // Images
        this.logger = logger; // Logger
    }

    loadImagesFromAlbum() { // Load images from album using Request object
        this.logger.info('Fetching baits');
        this.request.getAlbum().then(response => {
            this.images = response; // If promise resolves, populates bait array
            this.logger.info('Baits fetched');
        }).catch(err => this.logger.warn('Error fetching baits'));
    }

    getRandomImage(){ // Gets random bait image from images array
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}
