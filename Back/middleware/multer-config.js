const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log(file.originalname);
        const name = file.originalname.split('.')[0].split(' ').join('_');
        console.log(name);
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');
