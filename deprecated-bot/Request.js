import auth from '../auth.json';
import request from 'request';

export class Request {

    constructor(url) { // Constructor
        this.url = url; // Request url
        this.requestOpts = { // Request options
            url: url,
            headers: { 'Authorization': 'Client-ID ' + auth.client_id }
        }
    }

    getAlbum() { // Gets images from album
        return new Promise((resolve, reject) => { // Returns Promise
            request.get(this.requestOpts, (err, res, body) => { // Makes get request
                if(err) { reject(err); return; }

                let imagesJSON = JSON.parse(body).data; // Creates JSON of images
                resolve(imagesJSON.map(image => { return image.link })); // Maps and returns links from images
            });
        });
    }
}
