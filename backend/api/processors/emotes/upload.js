'use strict';

const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const elixrAuthCheck = require('../../helpers/loggedInCheck');

const Emote = require('../../../database/models/emote.model');
const User = require('../../../database/models/user.model');

function createEmoteDBEntry(channelId, emotePath){
    return new Promise((resolve, reject) => {
        let extension = path.extname(emotePath);
        let emoteName = path.basename(emotePath, extension);
        let emote = new Emote();

        emote.ownerId = channelId;
        emote.command = emoteName;
        emote.filename = path.basename(emotePath);

        emote.save(function(err){
            if(err){
                return reject(err);
            }

            return resolve(emote._id.toString());
        });
    });
}

function updateEmoteList(user, emoteId){
    return new Promise((resolve, reject) => {
        if(user == null || emoteId == null){
            console.log(user, emoteId);
            return reject('Not enough info provided.');
        }

        if(user['emotes'].includes(emoteId)){
            return resolve(user.emotes);
        }
    
        user['emotes'].push(emoteId);
    
        user.save().then(user => {
            return resolve(user.emotes);
        })
        .catch(err => {
            console.log(err);
        });
    });
}

function validateMimeType(mimetype){
    let validMimetypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif"
    ];

    if(!validMimetypes.includes(mimetype)){
        return false;
    }

    return true;
}

function validateExtension(filename){
    const imageExtension = filename.split(".")[
        filename.split(".").length - 1
    ];

    let validExtensions = [
        "gif",
        "png",
        "jpg",
        "jpeg"
    ];

    if(!validExtensions.includes(imageExtension)){
        return false;
    }

    return true;
}

function uploadEmote (req, res) {
    if(!elixrAuthCheck.isLoggedIn(req)){
        return res.status(401).json({ msg: "Not authorized." });
    }

    let busboy = new Busboy({ 
        headers: req.headers,
        limits: {
            fieldSize: 1000000 // 1mb limit
        } 
    });

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.on('limit', function(){
            file.resume();
            return res.status(400).json({msg: "File was over size limit."});
        })

        if(!validateMimeType(mimetype)){
            file.resume();
            return res.status(400).json({msg: "Wrong file type was uploaded."});
        }

        if(!validateExtension(filename)){
            file.resume();
            return res.status(400).json({msg: "File had incorrect extension."});
        }

        // Confirm we have a channel id.
        let channelId = req.user.channelId;
        if(channelId == null || channelId == ""){
            return res.status(401).json({ msg: "Not authorized." });
        }

        // Confirm we have a registered user using the channel id.
        User.findOne({channelId}).then(user => {
            if(!user) {
                return res.status(400).json({msg: "No user found."});
            }
    
            // Upload files and update DB entries.
            let emotePath = path.join(__dirname, '../../../../user-content', channelId.toString(), filename);
            fs.mkdir(path.dirname(emotePath), { recursive: true }, (err) => {
                if (err) throw err;
                let fstream = fs.createWriteStream(emotePath);
                fstream.on('finish', function() {
                    //Create emote DB entry.
                    createEmoteDBEntry(channelId, emotePath)
                    .then(emoteId => {
                        updateEmoteList(user, emoteId)
                        .catch(err => {
                            console.log(err);
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                    })                    
                });
                file.pipe(fstream);
            });
        });
    });

    busboy.on('finish', function () {
        return res.status(200).json({ msg: "Emote(s) uploaded!" });
    });

    req.pipe(busboy);
};

module.exports.upload = uploadEmote;