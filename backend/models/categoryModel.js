const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, 'The category field is required'],
        unique: [true, 'The category already exists']
    }
})

module.exports = mongoose.model('Category', categorySchema)