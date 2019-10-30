const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Models
let User = require('../../database/models/user.model');

// Get user
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    User.findOne({userId}).then(user => {
        if(!user) {
            return res.status(400).json({msg: "No user found."});
        }

        jwt.sign(
            {userId: user.id},
            jwtSecret,
            {expiresIn: 3600},
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        userId: user.userId,
                        emotes: user.emotes,
                        accountStatus: user.accountStatus,
                        banned: user.banned
                    }
                });
            }
        )
    })
})

// Register user
router.post('/', (req, res) => {
    const userId  = req.body.userId;

    if(!Number.isInteger(userId)){
        return res.status(400).json({msg: "No user id was specified."});
    }

    User.findOne({ userId })
        .then(user => {
            if(user) {
                return res.status(400).json({msg: "User id already exists."});
            }

            const newUser = new User({
                userId
            });

            newUser.save().then(user => {
                jwt.sign(
                    {userId: user.id},
                    jwtSecret,
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                userId: user.userId
                            }
                        });
                    }
                )
            });
        });
});

module.exports = router;