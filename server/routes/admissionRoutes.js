const router = require('express').Router();
const { apply, listApplications, updateStatus } = require('../controllers/admissionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').post(apply).get(protect, authorize('superadmin', 'admin'), listApplications);
router.put('/:id/status', protect, authorize('superadmin', 'admin'), updateStatus);

module.exports = router;