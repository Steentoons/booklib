const fs = require('fs')
const multer = require('multer')

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

module.exports = storage