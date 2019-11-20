const express = require('express');
const router = express.Router();
const emoteUrlBuilder = require('../processors/emotes/emoteUrlBuilder');

// Models
let User = require('../../database/models/user.model');
let Emotes = require('../../database/models/emote.model');

// Get basic user info and LIVE emotes.
router.get('/:id/emotes', (req, res) => {
    const userId = req.params.id;
    User.findOne({'channelId': userId}).then(user => {
        if(!user) {
            return res.status(400).json({msg: "No user found."});
        }

        let emoteQuery = Emotes.find({
            '_id': { $in: user.emotes },
            'request.status': 'Published'
        });

        emoteQuery.select('ownerId shared command filename');

        emoteQuery.lean().exec(function (err, emotes){
            if(err){
                return res.status(404).json({msg: "There was an error while getting user emotes."});
            }

            emotes.forEach(emote => {
                emote.url = emoteUrlBuilder.buildUrl(emote.ownerId, emote);
                delete emote["filename"];
            });

            res.json({
                channelId: user.channelId,
                accountLevel: user.account.level,
                emotes: emotes
            });
        })
    })
})

module.exports = router;