const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title field cannot be empty'],
    },
    author: {
        type: String,
        required: [true, 'author field cannot be empty'],
    },
    year: {
        type: String,
        required: [true, 'year field cannot be empty'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'category field cannot be empty'],
    },
    user: {
        type: String,
        required: [true, 'The email field is required']
    },
    cover_image: {
        type: String,
        required: [true, 'cover_image field cannot be empty'],
    },
    file: {
        type: String,
        required: [true, 'file field cannot be empty'],
    },
});

module.exports = mongoose.model("Book", bookSchema);