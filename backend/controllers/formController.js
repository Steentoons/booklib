const Book = require('../models/bookModel')

const getBookFormData = async(req, res) => {
    // validation...
    if (!req.params.id) {
        return res.status(400).json({ error: "There was an issue with the book" })
    }
    if (!req.user) {
        return res.status(403).json({ error: "Forbidden" })
    }
    if (!req.user.email) {
        return res.status(403).json({ error: "Forbidden" })
    }

    // Fetch the required data...
    try {
        const book = await Book.findOne({ user: req.user.email, _id: req.params.id })
        return res.status(200).json({ formdata: book })
    } catch (err) {
        return res.status(500).json({ error: "There was a problem while filling form data" })
    }
}

module.exports = getBookFormData