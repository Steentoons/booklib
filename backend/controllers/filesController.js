const fs = require('fs')
const path = require('path')
const { handlePdf } = require('../helpers/fileControllerHelpers')

// Method GET 
// @params :id

const getImages = (req, res) => {
    const imageName = req.params.name

    if (!imageName) {
        return res.status(400).json({ error: 'There was a problem when fetching the cover image' })
    }

    // Send back an image to the client...
    const image = path.join(__dirname, "..", "cover-uploads", imageName)
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(image)
}

const getFiles = (req, res) => {
    const fileName = req.params.name
    console.log("🚀 ~ file: filesController.js:22 ~ getFiles ~ fileName:", fileName)

    if (!fileName) {
        return res.status(400).json({ error: 'There was a problem when fetching the file' })
    }

    // Send back an image to the client...
    if (path.extname(fileName) === '.pdf') {
        // Handle pdf...
        res.send(handlePdf(fileName))
    } else {
        // handle epub...
        const filePath = path.join(__dirname, "..", "book-uploads", fileName)
        fs.readFile(filePath, function(err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' });
                res.end("No such file");
            } else {
                res.setHeader('content-type', 'application/epub+zip');
                res.end(content);
            }
        });
    }
}

module.exports = {
    getImages,
    getFiles
}