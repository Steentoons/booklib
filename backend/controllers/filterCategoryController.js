const Book = require("../models/bookModel")

const getCategoryFilter = async(req, res) => {
    // Validation...
    if (!req.params.id) {
        return res.status(400).json({ error: "There was an issue when applying the filter" })
    }

    if (!req.user) {
        return res.status(403).json({ error: "There was an issue when applying the filter" })
    }

    if (!req.user.email) {
        return res.status(403).json({ error: "There was an issue when applying the filter" })
    }

    // Applying the filter...
    try {
        console.log(req.params.id)
        const filteredBooks = await Book.find({ user: req.user.email, category: req.params.id })
        console.log(filteredBooks)
        return res.status(200).json({ books: filteredBooks })
    } catch (err) {
        return res.status(500).json({ error: "There was a problem when applying the filter" })
    }

}

module.exports = getCategoryFilter