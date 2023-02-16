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

module.exports = uploadFilter