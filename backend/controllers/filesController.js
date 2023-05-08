const express = require('express')
const fs = require('fs')
const path = require('path')

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
        console.log('The extension is pdf')
        const file = path.join(__dirname, "..", "book-uploads", fileName)
        const data = fs.readFileSync(file);
        const base64Data = Buffer.from(data).toString('base64');
        res.send(base64Data)
    } else {
        console.log('Ext is epub')
        const file = path.join(__dirname, "..", "book-uploads", fileName)
        res.setHeader('Content-Type', 'application/epub+zip');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.send(file)

        // TODO Try streaming the file first...
    }
}

module.exports = {
    getImages,
    getFiles
}