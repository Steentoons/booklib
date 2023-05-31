const Book = require('../models/bookModel')

const searchBook = async(req, res) => {
    // Validation...
    if (!req.params) {
        return res.status(400)
    }

    if (!req.params.term) {
        return res.status(400)
    }

    if (!req.user) {
        return res.status(403)
    }

    if (!req.user.email) {
        return res.status(403)
    }

    // Perform the search...
    try {
        const searchBookPipeline = [{
            '$search': {
                'index': 'default',
                'text': {
                    'query': req.params.term,
                    'path': {
                        'wildcard': '*'
                    }
                }
            }
        }, {
            '$match': {
                'user': req.user.email
            }
        }]
        const bookResults = await Book.aggregate(searchBookPipeline)

        console.log(bookResults)
        return res.status(200).json({ books: bookResults })
    } catch (err) {
        return res.status(500)
    }

}

module.exports = searchBook