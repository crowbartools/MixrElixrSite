const router = require('express').Router();
let EmoteRequest = require('../../database/models/emoteRequest.model');

router.route('/').get((req, res) => {
    console.log('You got the emote request endpoint!');
});

module.exports = router;