'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    req.logout();
    res.redirect('http://localhost:3000');
});
  

module.exports = router;