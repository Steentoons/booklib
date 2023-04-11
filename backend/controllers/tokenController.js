const RefreshToken = require('../models/refreshTokenModel')
const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/generateToken')

/*
    method: POST
    Refreshing the tokens...
*/
const refreshToken = async(req, res) => {
    const refToken = req.body.refreshToken
        // Validate the inputs...
    if (!refToken) {
        return res.status(400).json({ error: 'There was no refresh token provided' })
    }

    // Get refresh tokens from the database...
    // const isRefreshTokenExist = await RefreshToken.exists({ token: refToken })
    const savedTokenObj = await RefreshToken.findOne()
    const savedToken = savedTokenObj.refreshToken
    if (!savedToken.includes(refToken)) {
        return res.status(403).json({ error: 'Access Denied' })
    }

    // Verify the refresh token...
    jwt.verify(refToken, process.env.JSON_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Access Denied' })
        }

        const accessToken = generateToken({ email: user.email })
        res.status(201).json({ token: accessToken })
    })
}

/*
    method GET
    Getting all the tokens
*/

const getTokens = async(req, res) => {
    const savedTokens = await RefreshToken.findOne()
    res.status(200).json({ tokens: savedTokens.refreshToken })
}

module.exports = {
    refreshToken,
    getTokens
}