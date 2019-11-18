const router = require('express').Router();
const uploadEmote = require('../processors/emotes/upload');

router.route('/upload').post((req, res, next)  => {
    uploadEmote.upload(req, res);
});

/**
router.route('/delete').get((req, res) => {
    // You should be able to delete an emote via this endpoint
    // ONLY if you are an owner or admin.
    // Should be able to pass an array of emotes to delete.
    console.log('You got the emote request endpoint!');
});
router.route('/').get((req, res) => {
    // Get a list of all global emotes.
    console.log('You got the global emotes list endpoint!');
});
router.get('/emote/:id', (req, res) => {
    // Provide an emoteId to get a specific emote.
    console.log('You got the specific emote endpoint!');
})
 */

module.exports = router;