const router = require('express').Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('superadmin', 'admin', 'editor', 'sports-coordinator'), upload.single('image'), uploadImage);

module.exports = router;