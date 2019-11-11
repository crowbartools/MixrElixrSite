'use strict';

const userRouter = require('./routes/user.route');
const emoteRouter = require('./routes/emotes.route');
const authRouter = require('./routes/auth.route');
const logoutRouter = require('./routes/logout.route');

function registerRoutes(){
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/emotes', emoteRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/logout', logoutRouter);
}

module.exports.registerRoutes = registerRoutes;