const express = require("express");
const multer = require("multer");
const { putBooks, postBooks, getBooks, deleteBooks } = require("../controllers/booksController");
const storage = require("../helpers/storageHelper");
const uploadFilter = require("../helpers/uploadFilterHelper");
const verifyToken = require("../middlewares/tokenVerification");

const router = express.Router()

const uploadBook = multer({ storage: storage, fileFilter: uploadFilter })

// Handle routes...
router.get("/", verifyToken, getBooks);

router.post("/",
    verifyToken,
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    postBooks);

router.put("/:id",
    verifyToken,
    uploadBook.fields([
        { name: "cover_image", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    putBooks);

router.delete("/:id", verifyToken, deleteBooks);

module.exports = router;