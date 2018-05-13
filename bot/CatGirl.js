import auth from '../auth.json';
import request from 'request';

export class CatGirl {

    constructor(url){
        this.url = url;
        this.requestOpts = {
            url: url,
            headers: { 'Authorization': 'Client-ID ' + auth.client_id }
        }

        // Get request for catgirl images
        this.images = Array();
        request.get(this.requestOpts, function(err, res, body){
            
            let imagesJSON = JSON.parse(body).data; // Creates JSON of images
            this.images = imagesJSON.map(image => { return image.link }); // Maps links from images
            
        });

        console.log(this.images);

    }

    getRandomImage(){
        return this.images[Math.floor(Math.random() * this.images.length)];
    }
}