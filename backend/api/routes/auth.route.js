'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const MixerStrategy = require('passport-mixer').Strategy;
const session = require('express-session');

// Models
let User = require('../../database/models/user.model');

// Mixer login information
const mixerLogin = {
    clientID: process.env.MIXER_CLIENT_ID,
    clientSecret: process.env.MIXER_CLIENT_SECRET
}

// Setup Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

// Setup passport
passport.use(new MixerStrategy({
    clientID: mixerLogin.clientID,
    clientSecret: mixerLogin.clientSecret,
    callbackURL: process.env.HOST_NAME + '/api/v1/auth/mixer/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // TODO: Use profile to create an account if none exists.
    console.log('Got mixer profile!');
    return done(null, profile.id);
  }
));

// Try to auth with a service.
router.get('/mixer', passport.authenticate('mixer'));

// Mixer callback
router.get('/mixer/callback', passport.authenticate('mixer', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('Successful mixer auth! Going home.');
    res.redirect('/');
  });

module.exports = router;