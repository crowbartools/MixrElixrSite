const express = require('express');
const router = express.Router();
const getUserEmotes = require('../helpers/getUserEmotes');

let User = require('../../database/models/user.model');

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

// Pass comma separate list of channel ids and get usernames for each.
router.get('/', (req, res) => {
    if(req.query.ids == null){
        // TODO: Do we want to return anything here or error?
        return res.status(400).json({msg: 'Please provide a query string of ids.'}); 
    }
    const channelIds = req.query.ids.split(',');

    let userQuery = User.find({
        'channelId': { $in: channelIds }
    });

    userQuery.select('channelId username');

    userQuery.lean().exec(function (err, users){
        if(err){
            return reject("There was an error while getting users.");
        }

        let userList = [];

        users.forEach(user => {
            let userObj = {
                username: user.username,
                channelId: user.channelId
            }
            userList.push(userObj);
        });

        return resolve({
            list: userList
        });
    })

})

module.exports = router;