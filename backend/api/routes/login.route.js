const express = require('express');
const router = express.Router();
const passport = require('passport');
const MixerStrategy = require('passport-mixer').Strategy;

// Models
let User = require('../../database/models/user.model');

const mixerLogin = {
    authURL: "/mixer",
    callbackURLLocal: "/mixer/callback",
    callbackURLRemote: "/api/v1/auth/mixer/callback",
    clientID: process.env.MIXER_CLIENT_ID,
    clientSecret: process.env.MIXER_CLIENT_SECRET
}

// Setup passport
passport.use(new MixerStrategy({
    clientID: mixerLogin.clientID,
    clientSecret: mixerLogin.clientID,
    callbackURL: mixerLogin.callbackURLRemote
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));

// Try to auth with a service.
router.get(mixerLogin.authURL, passport.authenticate('mixer'));

// Mixer callback
router.get(mixerLogin.callbackURLLocal, 
  passport.authenticate('mixer', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;