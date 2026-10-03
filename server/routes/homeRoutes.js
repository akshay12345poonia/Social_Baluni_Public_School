const router = require('express').Router();
const News = require('../models/News');
const Event = require('../models/Event');
const Notice = require('../models/Notice');
const Achievement = require('../models/Achievement');
const Program = require('../models/Program');
const Sport = require('../models/Sport');
const Testimonial = require('../models/Testimonial');
const Setting = require('../models/Setting');

router.get('/', async (req, res) => {
  try {
    const [home, stats, notices, news, events, achievements, programs, sports, testimonials] =
      await Promise.all([
        Setting.findOne({ key: 'home' }),
        Setting.findOne({ key: 'stats' }),
        Notice.find({ isActive: true }).sort('-issuedAt').limit(6).select('title issuedAt'),
        News.find({ isPublished: true }).sort('-publishedAt').limit(4),
        Event.find({ startDate: { $gte: new Date() } }).sort('startDate').limit(3),
        Achievement.find({ isFeatured: true }).sort('-year').limit(8),
        Program.find({ isActive: true }).sort('order').limit(6),
        Sport.find({ isActive: true }).sort('order').limit(10).select('name slug icon coverImage description facilities'),
        Testimonial.find().sort('-createdAt').limit(5),
      ]);

    res.json({
      success: true,
      data: {
        banners: home?.value?.banners || [],
        stats: stats?.value || null,
        notices, news, events, achievements, programs, sports, testimonials,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;