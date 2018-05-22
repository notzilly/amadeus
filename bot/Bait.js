import { Request } from './Request.js';

export class Bait {

    constructor(url){ // Constructor
        this.request = new Request(url); // Request object
        this.images = undefined; // Images
    }

    loadImagesFromAlbum() { // Load images from album using Request object
        this.request.getAlbum().then(response => {
            this.images = response; // If promise resolves, populates bait array
        });
    }

    getRandomImage(){ // Gets random bait image from images array
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}
