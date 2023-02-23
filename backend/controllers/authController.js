require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const generateToken = require('../helpers/generateToken')
const RefreshToken = require('../models/refreshTokenModel')

/* 
    method POST
    Login into the system and generating token...
*/
const login = async(req, res) => {
    // Validation...
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({ error: 'The email field is required' })
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return res.status(400).json({ error: 'The email is invalid' })
    } else if (!password) {
        return res.status(400).json({ error: 'The password field is required' })
    }

    // Call to the database and hashing password...
    const isEmailExist = await User.exists({ email: email })
    if (!isEmailExist) {
        return res.status(400).json({ error: 'Email does not exist' })
    }
    const savedUser = await User.findOne({ email: email })
    const isMatch = await bcrypt.compare(password, savedUser.password)

    // Authentication...
    if (email !== savedUser.email || !isMatch) {
        return res.status(403).json({ error: 'Access denied' })
    }

    // Creating the tokens...
    const user = {
        email: email
    }

    const token = generateToken(user)
    const refreshToken = jwt.sign(user, process.env.JSON_REFRESH_TOKEN_SECRET)
    const savedTokens = await RefreshToken.findOne()

    if (savedTokens === null) {
        RefreshToken.create({ refreshToken: [refreshToken] })
    } else {
        try {
            const newRefreshArr = [...savedTokens.refreshToken, refreshToken]
            savedTokens.refreshToken = newRefreshArr
            savedTokens.save()
        } catch (error) {
            return res.status(503).json({ error: 'There was an error when refreshing your token' })
        }
    }
    // const updateRefreshToken = await RefreshToken.updateOne({ refreshToken: [...savedTokens.refreshToken, refreshToken] })
    // console.log(updateRefreshToken)
    // Get the token back to the user...
    res.status(200).json({ message: 'Login was successiful', token: token, refreshtoken: refreshToken })
}

/* 
    method POST
    Login into the system and generating token...
*/
const logout = async(req, res) => {
    if (!req.body.token) return res.status(400)
    const savedRefreshTokenObj = await RefreshToken.findOne()
    const savedRefreshToken = savedRefreshTokenObj.refreshToken
    const newRefreshToken = savedRefreshToken.filter((token) => token !== req.body.token)

    try {
        savedRefreshTokenObj.refreshToken = newRefreshToken
        savedRefreshTokenObj.save()
        res.status(204).json({ message: "You were successifully logged out" })
    } catch (error) {
        return res.status(503).json({ error: 'Could not logout' })
    }
}

module.exports = {
    login,
    logout
}