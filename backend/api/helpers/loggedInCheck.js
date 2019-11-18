'use strict';

/**
 * To lock down a route to only authed users, provide this function as a second arguement.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isLoggedIn(req) {
    if (req != null && req.isAuthenticated()) {
        return true; 
    }

    // User denied.
    return false;
}

module.exports.isLoggedIn = isLoggedIn;