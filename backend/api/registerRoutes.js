'use strict';

const userRouter = require('./routes/user.route');
const emoteRequestRouter = require('./routes/emoteRequest.route');

function registerRoutes(app){
    app.use('/user', userRouter);
    app.use('/emote', emoteRequestRouter);
}

module.exports.registerRoutes = registerRoutes;