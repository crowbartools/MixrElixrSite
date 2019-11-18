const express = require('express');
const router = express.Router();
const elixrApiHelpers = require('../helpers/loggedInCheck');

// Models
let User = require('../../database/models/user.model');

// Get user
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    User.findOne({userId}).then(user => {
        if(!user) {
            return res.status(400).json({msg: "No user found."});
        }

        res.json({
            token,
            user: {
                userId: user.userId,
                accountLevel: user.account.level,
                emotes: user.emotes
            }
        });
    })
})

module.exports = router;