const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");
const fs = require('fs')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'cover_image') {
            const dir = "cover-uploads/"
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            cb(null, dir)
        } else if (file.fieldname === 'file') {
            const dir = "book-uploads/"
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
            cb(null, dir)
        }
    },
    filename: (req, file, cb) => {
        const fullname = file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        cb(null, fullname)
    }
});

const uploadFilter = (req, file, cb) => {
    if (file.fieldname === 'cover_image') {
        const allowedMimeTypes = [
            "image/png",
            "image/jpeg",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, false);
        }
        cb(null, true);
    } else if (file.fieldname === 'file') {
        const allowedMimeTypes = [
            "application/pdf",
            "application/epub",
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, false);
        }
        cb(null, true);
    }
}
const uploadBook = multer({ storage: storage, fileFilter: uploadFilter });

router.post(
    "/books",
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    (req, res, next) => {
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
);

router.get("/books", (req, res) => {
    Book.find()
        .then((books) => {
            return res.status(200).json({ books: books });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
});

router.put(
    "/books/:id",
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    (req, res) => {
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

        const newBook = {
            title: title,
            author: author,
            year: year,
            category: category,
            cover_image: '/book-cover/image.png',
            file: '/book-cover/file.pdf',
        };

        Book.updateOne({ _id: req.params.id }, newBook, (err, book) => {
            if (err) {
                return res
                    .status(200)
                    .json({ message: "The book was updated successifully", data: book });
            } else {
                res
                    .status(400)
                    .json({ error: "There was an error when updating the book" });
            }
        });
    }
);

router.post("/categories", (req, res, next) => {
    if (!req.body.category) {
        return res.status(400).json("Fill in all the required fields");
    }

    const category = new Category({
        category: req.body.category,
    });

    category
        .save()
        .then((savedCategory) => {
            Category.findById(savedCategory._id)
                .select("category")
                .then((category) => {
                    res.status(201).json({
                        data: category,
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
});

router.get("/categories", (req, res) => {
    Category.find()
        .then((categories) => {
            return res.status(200).json({ categories: categories });
        })
        .catch((err) => {
            return res.status(500).json("There was an error when getting categories");
        });
});

module.exports = router;