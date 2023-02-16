const path = require('path')
const fs = require('fs')

const manageFiles = (cover_image, file) => {
    // Delete the file and cover image if they exists...
    const oldCoverPath = path.join(__dirname, '../cover-uploads/', path.basename(cover_image))
    const oldFilePath = path.join(__dirname, '../book-uploads/', path.basename(file))

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
}

module.exports = manageFiles