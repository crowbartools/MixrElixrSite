'use strict';
const emoteUrlBuilder = require('../processors/emotes/emoteUrlBuilder');

// Models
let User = require('../../database/models/user.model');
let Emotes = require('../../database/models/emote.model');

function mergeByProperty(userList, emotes){
    let mergedEmotes = [];

    emotes.forEach(emote => {
        let matchedUser = userList.filter(user => emote.ownerId === user.channelId);
        if(matchedUser !== false) {
            emote['ownerUsername'] = matchedUser[0].username;
        }
        mergedEmotes.push(emote);
    });
    
    return mergedEmotes;
}

function getEmoteOwnerUsernames(channelIdList, emotes){
    return new Promise(function(resolve, reject) {
        User.find({
            'channelId': { $in: channelIdList}
        }, function(err, emoteOwners){
            let userList = [];

            if(err){
                return resolve(userList);
            }
    
            emoteOwners.forEach(owner => {
                userList.push({
                    channelId: owner.channelId,
                    username: owner.username
                })
            })

            let emotesFinal = mergeByProperty(userList, emotes);
    
            return resolve(emotesFinal);
        });
    });
}

function getUserEmotes(channelId){
    return new Promise(function(resolve, reject) {
        User.findOne({'channelId': channelId}).then(user => {
            if(!user) {
                return reject("No user found.");
            }
    
            // Get all of the emotes for the user.
            let emoteQuery = Emotes.find({
                '_id': { $in: user.emotes }
            });
            emoteQuery.select('ownerId shared command filename request meta');
            emoteQuery.lean().exec(function (err, emotes){
                if(err){
                    return reject("There was an error while getting user emotes.");
                }

                // Rebuild the url for each emote to whatever we want.
                emotes.forEach(emote => {
                    emote.url = emoteUrlBuilder.buildUrl(emote.ownerId, emote);
                    delete emote["filename"];
                });
               
                // Get a list of the channelIds for each emote owner in the users list.
                let channelIdList = emotes.map(function (emote){
                    return emote.ownerId;
                });

                // Get the usernames of all of the emote owners.
                getEmoteOwnerUsernames(channelIdList, emotes).then( emotesFinal => {
                    return resolve({
                        channelId: user.channelId,
                        accountLevel: user.account.level,
                        emotes: emotesFinal
                    });
                });

            })
        })
    });
}

module.exports.get = getUserEmotes;