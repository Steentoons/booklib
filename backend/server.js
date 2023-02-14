require('dotenv').config()
const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const Epub = require("epub");
const pdfjs = require("pdfjs-dist");
const path = require("path");
const Book = require("./models/bookModel");
const { memoryStorage } = require("multer");
const { application } = require("express");
const connect = require('../db/db')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const bookRoutes = require('./routes/bookRoutes')
const colors = require('colors')
connect()

// ACCESSING THE FILES...
openDocument = (docPath) => {
    switch (path.extname) {
        case ".pdf":
            handlePdfFn(docPath);
        case ".epub":
            handleEpubFn(docPath);
    }
};

const handlePdfFn = (docPath) => {
    // Working with pdfs...
    pdfjs.getDocument(docPath).then((pdf) => {
        // Use pdf methods to retrieve text or images
        // Render the epub
    });
};

const handleEpubFn = (docPath) => {
    // Working with epub...
    const epub = new Epub(docPath);
    epub.on("end", () => {
        // Use epub methods to retrieve text or images
        // Render the epub
    });

    epub.parse();
};

// Calling the readers...
openDocument("provide/valid/document.pdf");
openDocument("provide/valid/document.epub");

// STORING TO THE FILES...
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        );
    },
});

const upload = multer({ storage: storage });

app.use('/api', bookRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));