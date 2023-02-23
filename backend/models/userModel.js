const mongoose = require('mongoose')
const hashPassword = require('../middlewares/hashPasswordMiddleware')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required']
    },
    email: {
        type: String,
        required: [true, 'The email field is required'],
        index: {
            unique: [true, 'The email is already taken']
        }
    },
    password: {
        type: String,
        required: [true, 'The name field is required']
    }
})

hashPassword(userSchema)

module.exports = mongoose.model('User', userSchema)