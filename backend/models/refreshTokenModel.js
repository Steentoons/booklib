const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    refreshToken: {
        type: Array,
        required: [true, 'The refresh token is required']
    }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)