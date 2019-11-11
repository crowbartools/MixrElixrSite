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
    // Register a new user if none exists.
    const userId  = profile.id;

    if(!Number.isInteger(userId)){
        return res.status(400).json({msg: "No user id was specified."});
    }

    User.findOne({ userId })
        .then(user => {
            if(user) {
              return done(null, profile.id);
            }

            const newUser = new User({
                userId
            });

            newUser.save().then(user => {
              return done(null, profile.id);
            });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/');
        });
  }
));

// Try to auth with a service.
router.get('/mixer', passport.authenticate('mixer'));

// Mixer callback
router.get('/mixer/callback', passport.authenticate('mixer', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('Successful mixer auth!');
    
    res.redirect('http://localhost:3000');
  });

// Successfully Authenticated?
router.get("/mixer/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

module.exports = router;