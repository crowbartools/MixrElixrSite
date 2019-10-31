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

    /** Temp */
    app.get('/', function (req, res) {
        var html = "<ul>\
          <li><a href='/api/v1/auth/mixer'>Mixer Login</a></li>\
          <li><a href='/logout'>logout</a></li>\
        </ul>";

        // Check if user is authenticated.
        if (req.isAuthenticated()) {
            html += "<p>authenticated as user:</p>"
            html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
        }
      
        res.send(html);
      });

}

module.exports.registerRoutes = registerRoutes;