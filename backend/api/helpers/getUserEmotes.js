'use strict';
const emoteUrlBuilder = require('../processors/emotes/emoteUrlBuilder');

// Models
let User = require('../../database/models/user.model');
let Emotes = require('../../database/models/emote.model');

function getUserEmotes(channelId){
    return new Promise(function(resolve, reject) {
        User.findOne({'channelId': channelId}).then(user => {
            if(!user) {
                return reject("No user found.");
            }
    
            let emoteQuery = Emotes.find({
                '_id': { $in: user.emotes }
            });
    
            emoteQuery.select('ownerId shared command filename request meta');
    
            emoteQuery.lean().exec(function (err, emotes){
                if(err){
                    return reject("There was an error while getting user emotes.");
                }
    
                emotes.forEach(emote => {
                    emote.url = emoteUrlBuilder.buildUrl(emote.ownerId, emote);
                    delete emote["filename"];
                });
    
                return resolve({
                    channelId: user.channelId,
                    accountLevel: user.account.level,
                    emotes: emotes
                });
            })
        })
    });
}

module.exports.get = getUserEmotes;