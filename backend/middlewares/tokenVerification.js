const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    // Verify if the token is valid...
    const HeaderToken = req.headers['authorization']
    if (!HeaderToken) {
        return res.status(400).json({ error: 'No token was provided' })
    }

    const token = HeaderToken.split(' ')[1]
        // const token = HeaderToken

    if (!token) {
        return res.status(400).json({ error: 'No token was provided' })
    }
    jwt.verify(token, process.env.JSON_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Access denied' })
        }

        req.user = user
    })

    next()
}

module.exports = verifyToken