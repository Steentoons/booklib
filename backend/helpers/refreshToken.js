const RefreshToken = require('../models/refreshTokenModel')
const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/generateToken')

const refreshToken = async(refToken) => {
    // const refToken = req.body.refreshToken
    // Validate the inputs...
    if (!refToken) {
        return undefined
    }

    // Get refresh tokens from the database...
    // const isRefreshTokenExist = await RefreshToken.exists({ token: refToken })
    const savedTokenObj = await RefreshToken.findOne()
    const savedToken = savedTokenObj.refreshToken
    if (!savedToken.includes(refToken)) {
        return undefined
    }

    // Verify the refresh token...
    const newToken = jwt.verify(refToken, process.env.JSON_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return undefined
        }

        const accessToken = generateToken({ email: user.email })
        return accessToken
    })

    return newToken
}

module.exports = refreshToken