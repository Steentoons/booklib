const express = require("express");
const multer = require("multer");
const { putBooks, postBooks, getBooks } = require("../controllers/booksController");
const storage = require("../helpers/storageHelper");
const uploadFilter = require("../helpers/uploadFilterHelper");

const router = express.Router();

const uploadBook = multer({ storage: storage, fileFilter: uploadFilter })

// Handle routes...
router.get("/", getBooks);

router.post("/",
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    postBooks);

router.put("/:id",
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    putBooks);

module.exports = router;