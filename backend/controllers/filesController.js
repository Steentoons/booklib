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
    res.sendFile(image)
}

const getFiles = (req, res) => {
    const fileName = req.params.name

    if (!fileName) {
        return res.status(400).json({ error: 'There was a problem when fetching the file' })
    }

    // Send back an image to the client...
    const file = path.join(__dirname, "..", "book-uploads", fileName)
    res.sendFile(file)
}

module.exports = {
    getImages,
    getFiles
}