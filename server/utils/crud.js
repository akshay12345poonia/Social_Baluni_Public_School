const mongoose = require('mongoose');

/**
 * Generates reusable CRUD controllers for any model.
 * Supports ?page=&limit=&sort=&search= (searched across searchFields)
 */
const crud = (Model, searchFields = ['title']) => ({
  create: async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  },

  getAll: async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const filter = { ...req.query };
    ['page', 'limit', 'search', 'sort', 'fields'].forEach((k) => delete filter[k]);

    if (req.query.search) {
      filter.$or = searchFields.map((f) => ({
        [f]: { $regex: req.query.search, $options: 'i' },
      }));
    }

    const query = Model.find(filter);
    if (req.query.sort) query.sort(req.query.sort.split(',').join(' '));
    else query.sort('-createdAt');

    const [data, total] = await Promise.all([
      query.skip((page - 1) * limit).limit(limit).lean(),
      Model.countDocuments(filter),
    ]);

    res.json({ success: true, total, page, pages: Math.ceil(total / limit), data });
  },

  getOne: async (req, res) => {
    const key = req.params.idOrSlug;
    let doc = null;
    if (mongoose.Types.ObjectId.isValid(key)) doc = await Model.findById(key);
    if (!doc && Model.schema.path('slug')) doc = await Model.findOne({ slug: key });
    if (!doc) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, data: doc });
  },

  update: async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, data: doc });
  },

  remove: async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  },
});

module.exports = crud;