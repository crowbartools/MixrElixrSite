'use strict';

// Domains that can access close routes.
const whitelistDomains = [
    'http://localhost:3000',
    'http://localhost:5000'
];

// Routes that can't be accessed by anyone other than whitelisted domains.
const closedRoutes = [
    '/api/v1/auth/mixer/success'
];

function corsPolicy(req, res, next) {
    let requestURL = req.originalUrl;
    let origin = req.get('origin');

    if ( closedRoutes.indexOf(requestURL) > -1 && whitelistDomains.indexOf(origin) > -1){
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Content-Length, X-Requested-With, Access-Control-Allow-Credentials');
        res.header('Access-Control-Allow-Credentials', true);
    } else {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    }

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
};

module.exports.corsPolicy = corsPolicy;