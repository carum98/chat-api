import multer from 'multer'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/app/uploads')
	},
	filename: (req, file, cb) => {
		var filetype = '';

		if (file.mimetype === 'image/png') {
			filetype = 'png';
		}
		if (file.mimetype === 'image/jpeg') {
			filetype = 'jpg';
		}
		cb(null, Date.now() + '.' + filetype);
	}
})

const filter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

export default multer({ storage, fileFilter: filter }).single('image')