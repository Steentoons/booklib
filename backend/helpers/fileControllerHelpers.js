const path = require('path')
const fs = require('fs')

const handlePdf = (fileName) => {
    const file = path.join(__dirname, "..", "book-uploads", fileName)
    const data = fs.readFileSync(file);
    const base64Data = Buffer.from(data).toString('base64');
    return base64Data
}

module.exports = {
    handlePdf
}