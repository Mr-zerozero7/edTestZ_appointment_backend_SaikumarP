const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateToken = (user) => {
    console.log(user)
    return jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY, {expiresIn: '2d'});
}

module.exports = {generateToken};