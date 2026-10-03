const router = require('express').Router();
const Setting = require('../models/Setting');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public: GET /api/settings/home  → hero banners etc.
router.get('/:key', async (req, res) => {
  const setting = await Setting.findOne({ key: req.params.key });
  res.json({ success: true, data: setting?.value || null });
});

// Admin: PUT /api/settings/home with { "value": {...} }
router.put('/:key', protect, authorize('superadmin', 'admin'), async (req, res) => {
  const setting = await Setting.findOneAndUpdate(
    { key: req.params.key },
    { value: req.body.value },
    { new: true, upsert: true }
  );
  res.json({ success: true, data: setting });
});

module.exports = router;