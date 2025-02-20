const multer =require('multer');
const path=require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/'), 
        filename: (req, file, cb) => cb(null, file.originalname)
    }),
    limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = upload;