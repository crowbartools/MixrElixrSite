'use strict';

/**
 * To lock down a route to only authed users, provide this function as a second arguement.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }

    // User denied.
    res.redirect('/')
}

module.exports.isLoggedIn = isLoggedIn;