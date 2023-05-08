const jwt = require('jsonwebtoken')

// generating token...
const generateToken = (user) => {
    return jwt.sign(user, process.env.JSON_TOKEN_SECRET, { expiresIn: '15m' })
}

module.exports = generateToken