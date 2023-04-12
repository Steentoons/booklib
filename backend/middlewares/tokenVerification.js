const jwt = require('jsonwebtoken')
const refreshToken = require('../helpers/refreshToken')
const verifyToken = (req, res, next) => {
    console.log("This is where all token verification takes place")
    console.log(req.cookies.accessToken)

    let token = req.cookies.accessToken
        // const token = HeaderToken

    if (!token) {
        // Try to refresh the token...
        const newToken = refreshToken(req.cookies.refreshToken)

        if (!newToken) {
            req.refreshTokenFailed = true
        } else {
            token = newToken
        }
    }
    jwt.verify(token, process.env.JSON_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (req.tokenRefreshFailed) {
                res.status(403).json({ error: "Access Denied" })
            }
        } else {
            req.user = user
        }

    })

    if (!req.tokenRefreshFailed) {
        next()
    }
}

module.exports = verifyToken