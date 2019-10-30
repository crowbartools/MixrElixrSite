const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/**
 * Used to validate tokens for secure api endpoints.
 */
function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401).json({msg: 'Unauthorized.'})
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({msg: "Bad request."})
    }
}

module.exports = auth;