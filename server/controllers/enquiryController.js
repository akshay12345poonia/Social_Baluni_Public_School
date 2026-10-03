const Enquiry = require('../models/Enquiry');

exports.create = async (req, res) => {
  const { studentName, parentName, email, phone, classApplying, message } = req.body;
  const enquiry = await Enquiry.create({
    studentName,
    parentName,
    email,
    phone,
    classApplying,
    message,
  });
  // TODO: nodemailer -> notify admissions cell + auto-reply to parent
  res.status(201).json({
    success: true,
    message: 'Thank you! Our admissions team will contact you within 24 hours.',
    data: enquiry,
  });
};

exports.list = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const [data, total] = await Promise.all([
    Enquiry.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Enquiry.countDocuments(filter),
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), data });
};

exports.updateStatus = async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  res.json({ success: true, data: enquiry });
};