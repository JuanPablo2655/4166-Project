const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images');
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
	},
});

const fileFilter = (req, file, cb) => {
	const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (mimeTypes.includes(file.mimetype)) {
		return cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only jepg, png, or gif are allowed.'));
	}
};

const upload = multer({
	storage,
	limits: { fileSize: 7 * 1048576 },
	fileFilter,
}).single('image');

exports.fileUpload = (req, res, next) => {
	upload(req, res, err => {
		if (err) {
			err.status = 404;
			next(err);
		} else {
			next();
		}
	});
};
