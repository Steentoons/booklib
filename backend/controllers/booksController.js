const Category = require("../models/categoryModel");
const Book = require("../models/bookModel");
const path = require("path");
const fs = require("fs");
const manageFiles = require("../helpers/manageFiles");

/* 
    Method GET
    Get the books...
*/
const getBooks = (req, res) => {
    console.log("Calling this?")
    if (!req.user) {
        return res.status(400).json({ error: "There was a problem when getting them books" })
    }

    console.log(req.user)
    Book.find({ user: req.user.email }).lean()
        .then((books) => {

            const newBooks = books.map((book) => {
                // create a new object with the properties of the original book
                const newBook = Object.assign({}, book);

                newBook.fileExt = path.extname(book.file);
                return newBook;
            });
            return res.status(200).json({ books: newBooks });
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({ error: err });
        });
};

/* 
    Method POST
    Add the books...
*/
const postBooks = (req, res, next) => {
    const { title, author, year, category } = req.body;
    if (!title) {
        return res.status(400).json({ error: "The title field cannot be empty" });
    } else if (!author) {
        return res.status(400).json({ error: "The author field cannot be empty" });
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
        return res
            .status(400)
            .json({ error: "The file field is empty or invalid file type" });
    }

    const { cover_image, file } = req.files

    Category.exists({ _id: req.body.category }).then((category) => {
        if (!category) {
            return res.status(400).json({
                error: "Category not found",
            });
        }

        // Extracting the filenames from paths
        const fileName = path.basename(file[0].path);
        const imageName = path.basename(cover_image[0].path);

        // Updating the shema
        const bookObj = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year,
            category: req.body.category,
            cover_image: imageName,
            file: fileName,
            user: req.user.email,
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
};

/* 
    Method PUT
    Update the books...
*/
const putBooks = async(req, res, next) => {
    const { title, author, year, category } = req.body;
    if (!title) {
        return res.status(400).json({ error: "The title field cannot be empty" });
    } else if (!author) {
        return res.status(400).json({ error: "The author field cannot be empty" });
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
        return res
            .status(400)
            .json({ error: "The file field is empty or invalid file type" });
    }

    const { cover_image, file } = req.files;

    const newBook = {
        title: title,
        author: author,
        year: year,
        category: category,
        cover_image: cover_image[0].path,
        file: file[0].path,
        user: req.user.email,
    };

    const oldBook = await Book.findById(req.params.id);

    // Remove the duplicates module...
    manageFiles(oldBook.cover_image, oldBook.file);

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
};

/* 
    Method DELETE
    Deleting the books
*/
const deleteBooks = async(req, res) => {
    // Validate the request...
    const booksExists = await Book.exists({ _id: req.params.id });
    if (!booksExists) {
        return res.status(400).json({ error: "Could not find book with that id" });
    }

    // Delete file data associated with the book...
    const oldBook = await Book.findById(req.params.id);

    // Remove the duplicates module...
    manageFiles(oldBook.cover_image, oldBook.file);

    // Delete the category...
    try {
        const deletedBook = await Book.deleteOne({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "Book deleted successifully", data: deletedBook });
    } catch (err) {
        res.status(500).json({ error: "Could not delete book" });
    }
};

module.exports = {
    getBooks,
    putBooks,
    postBooks,
    deleteBooks,
};