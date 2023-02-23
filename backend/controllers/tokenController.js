const RefreshToken = require('../models/refreshTokenModel')
const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/generateToken')

const refreshToken = async(req, res) => {
    const refToken = req.body.refreshToken
        // Validate the inputs...
    if (!refToken) {
        return res.status(400).json({ error: 'There was no refresh token provided' })
    }

    // Get refresh tokens from the database...
    const isRefreshTokenExist = await RefreshToken.exists({ token: refToken })
    if (!isRefreshTokenExist) {
        console.log('There is no such refresh token...')
        return res.status(403).json({ error: 'Access Denied' })
    }

    // Verify the refresh token...
    jwt.verify(refToken, process.env.JSON_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('The token exists but there was a problem creating access...')
            return res.status(403).json({ error: 'Access Denied' })
        }

        const accessToken = generateToken({ email: user.email })
        res.status(201).json({ token: accessToken })
    })
}

module.exports = refreshToken