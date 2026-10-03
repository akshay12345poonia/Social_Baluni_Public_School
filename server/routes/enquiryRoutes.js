const router = require('express').Router();
const { create, list, updateStatus } = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').post(create).get(protect, authorize('superadmin', 'admin'), list);
router.put('/:id/status', protect, authorize('superadmin', 'admin'), updateStatus);

module.exports = router;