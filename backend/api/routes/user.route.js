const express = require('express');
const router = express.Router();
const getUserEmotes = require('../helpers/getUserEmotes');

// Get basic user info and all of their emotes.
router.get('/:id/emotes', (req, res) => {
    const channelId = req.params.id;
    getUserEmotes.get(channelId)
    .then((user) => {
        res.json({
            channelId: user.channelId,
            accountLevel: user.accountLevel,
            emotes: user.emotes
        });
    })
    .catch((err) =>{
        return res.status(400).json({msg: err}); 
    });
})

module.exports = router;