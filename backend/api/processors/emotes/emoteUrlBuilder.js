'use strict';

/**
 * This takes a channel ID and an emote DB object.
 * It will build a full url and return it.
 * This allows us to just store the filename in DB. So we can change this later
 * to provide updated paths should we use a CDN or something else.
 * @param {*} channelId 
 * @param {*} emote 
 */
function createEmoteUrl(channelId, emote){
    let basePath = "/user-content/" + channelId + "/" + emote.filename;
    return basePath;
}

module.exports.buildUrl = createEmoteUrl;