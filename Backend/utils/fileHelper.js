const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const deleteFile = (image) => {
    if (!image) return;
    const filePath = path.join(UPLOAD_DIR, path.basename(image));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

module.exports = { UPLOAD_DIR, deleteFile };
