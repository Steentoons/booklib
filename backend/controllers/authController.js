require('dotenv').config()
const jwt = require('jsonwebtoken')

const authController = async(req, res) => {
    // Authentication...
    const { username, password } = req.body
    if (!username) {
        return res.status(400).json({ error: 'The username field is required' })
    } else if (!password) {
        return res.status(400).json({ error: 'The password field is required' })
    }

    if (username !== 'Luther' || password !== 'password123') {
        return res.status(403).json({ error: 'Access denied' })
    }

    // Creating the tokens...
    const user = {
        username: username
    }
    const token = jwt.sign(user, process.env.JSON_TOKEN_SECRET)

    // Get the token back to the user...
    res.status(200).json({ message: 'Login was successiful', token: token })
}

module.exports = authController