'use strict';

const userRouter = require('./routes/user.route');
const emoteRequestRouter = require('./routes/emoteRequest.route');

function registerRoutes(app){
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/emotes', emoteRequestRouter);
}

module.exports.registerRoutes = registerRoutes;