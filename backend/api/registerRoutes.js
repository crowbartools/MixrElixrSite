'use strict';

const userRouter = require('./routes/user.route');
const emoteRequestRouter = require('./routes/emoteRequest.route');
const loginRouter = require('./routes/login.route');

function registerRoutes(){
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/emotes', emoteRequestRouter);
    app.use('/api/v1/auth', loginRouter);
}

module.exports.registerRoutes = registerRoutes;