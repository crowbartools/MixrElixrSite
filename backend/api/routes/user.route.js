const router = require('express').Router();
let User = require('../../database/models/user.model');

router.route('/').get((req, res) => {
    console.log('You got the user endpoint!');
});

module.exports = router;