const express = require('express');
const router = express.Router();
const passport = require('passport');
const MixerStrategy = require('passport-mixer').Strategy;

// Models
let User = require('../../database/models/user.model');

const mixerLogin = {
    authURL: "/mixer",
    callbackURL: "/mixer/callback",
    clientID: process.env.MIXER_CLIENT_ID,
    clientSecret: process.env.MIXER_CLIENT_SECRET
}

// Setup passport
passport.use(new MixerStrategy({
    clientID: mixerLogin.clientID,
    clientSecret: mixerLogin.clientID,
    callbackURL: process.env.MIXER_CLIENT_SECRET + mixerLogin.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    return res.status(200).json({msg: profile});
  }
));

// Try to auth with a service.
router.get(mixerLogin.authURL, passport.authenticate('mixer'));

// Mixer callback
router.get(mixerLogin.callbackURL, 
  passport.authenticate('mixer', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;