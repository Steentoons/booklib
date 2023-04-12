const RefreshToken = require('../models/refreshTokenModel')

/*
    method GET
    Getting all the tokens
*/

const getTokens = async(req, res) => {
    const savedTokens = await RefreshToken.findOne()
    res.status(200).json({ tokens: savedTokens.refreshToken })
}

module.exports = {
    getTokens
}