const uploadFilter = (req, file, cb) => {
    console.log("🚀 ~ file: uploadFilterHelper.js:2 ~ uploadFilter ~ file:", file)
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
            "application/epub+zip"
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(null, false);
        }
        cb(null, true);
    }
}

module.exports = uploadFilter