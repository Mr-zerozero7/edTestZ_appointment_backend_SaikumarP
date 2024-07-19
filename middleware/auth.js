const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = async (req, res, next) => {
    const tokenText = req.headers.authorization;
    const token = tokenText.split(' ')[1];
    // console.log(token);
    if(!token){
        return res.status(401).json({errorMsg: 'Unauthorized'});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(403).json({errorMsg: 'Invalid Token'});
        }
        req.user = decoded;
        // console.log(req.user)
        next();
    });
};

module.exports = authenticateJWT;