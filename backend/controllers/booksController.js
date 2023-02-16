const Category = require("../models/categoryModel");
const Book = require("../models/bookModel");
const path = require('path')
const fs = require('fs')

/* 
    Method GET
    Get the books...
*/
const getBooks = (req, res) => {
    Book.find()
        .then((books) => {
            return res.status(200).json({ books: books });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
}

/* 
    Method POST
    Add the books...
*/
const postBooks = (req, res, next) => {
    const { title, author, year, category } = req.body;
    const { cover_image, file } = req.files;
    if (!title) {
        return res.status(400).json({ error: "The title field cannot be empty" });
    } else if (!author) {
        return res
            .status(400)
            .json({ error: "The author field cannot be empty" });
    } else if (!year) {
        return res.status(400).json({ error: "The year field cannot be empty" });
    } else if (!category) {
        return res
            .status(400)
            .json({ error: "The category field cannot be empty" });
    } else if (!cover_image) {
        return res
            .status(400)
            .json({ error: "The cover image field is empty or invalid file type" });
    } else if (!file) {
        return res.status(400).json({ error: "The file field is empty or invalid file type" });
    }

    Category.exists({ _id: req.body.category }).then((category) => {
        if (!category) {
            return res.status(400).json({
                error: "Category not found",
            });
        }

        // Updating the shema
        const bookObj = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            category: req.body.category,
            cover_image: cover_image[0].path,
            file: file[0].path,
        };
        const book = new Book(bookObj);

        // Validating the mongoose schema and saving to database...
        book
            .validate()
            .then(() => {
                book.save((err) => {
                    if (err) {
                        throw new Error(err);
                    }
                    book.save();
                });
            })
            .then(() => {
                return res
                    .status(201)
                    .json({ message: "The book was created successfully" });
            })
            .catch((err) => {
                return res.status(400).json({ err });
            });
    });
}

/* 
    Method PUT
    Update the books...
*/
const putBooks = async(req, res, next) => {
    const { title, author, year, category } = req.body;
    if (!title) {
        return res.status(400).json({ error: "The title field cannot be empty" });
    } else if (!author) {
        return res
            .status(400)
            .json({ error: "The author field cannot be empty" });
    } else if (!year) {
        return res.status(400).json({ error: "The year field cannot be empty" });
    } else if (!category) {
        return res
            .status(400)
            .json({ error: "The category field cannot be empty" });
    } else if (!req.files.cover_image) {
        return res
            .status(400)
            .json({ error: "The cover image field is empty or invalid file type" });
    } else if (!req.files.file) {
        return res.status(400).json({ error: "The file field is empty or invalid file type" });
    }

    const { cover_image, file } = req.files;

    const newBook = {
        title: title,
        author: author,
        year: year,
        category: category,
        cover_image: cover_image[0].path,
        file: file[0].path,
    };

    const oldBook = await Book.findById(req.params.id)

    // Delete the file and cover image if they exists...
    const oldCoverPath = path.join(__dirname, '../cover-uploads/', path.basename(oldBook.cover_image))
    const oldFilePath = path.join(__dirname, '../book-uploads/', path.basename(oldBook.file))

    const removeDups = (filePath) => {
        fs.stat(filePath, (err) => {
            if (!err) {
                fs.unlink(filePath, err => {})
            }
        })
    }

    // Removing duplicates...
    removeDups(oldCoverPath)
    removeDups(oldFilePath)

    Book.updateOne({ _id: req.params.id }, newBook, (err, book) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "There was an error when updating the book" });
        } else {
            res
                .status(200)
                .json({ message: "The book was updated successifully", data: book });
        }
    });
}

module.exports = {
    getBooks,
    putBooks,
    postBooks
}