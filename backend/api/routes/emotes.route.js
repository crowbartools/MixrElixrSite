const router = require('express').Router();
let Emotes = require('../../database/models/emote.model');

router.route('/').get((req, res) => {
    // Get a list of all global emotes.
    console.log('You got the global emotes list endpoint!');
});

router.get('/:id', (req, res) => {
    // Provide an emoteId to get a specific emote.
    console.log('You got the specific emote endpoint!');
})

router.route('/save').get((req, res) => {
    // You should be able to EDIT and CREATE via this endpoint.
    // Should be able to pass an array of emotes to save.
    console.log('You got the emote save endpoint!');
});

router.route('/delete').get((req, res) => {
    // You should be able to delete an emote via this endpoint
    // ONLY if you are an owner or admin.
    // Should be able to pass an array of emotes to delete.
    console.log('You got the emote request endpoint!');
});


module.exports = router;