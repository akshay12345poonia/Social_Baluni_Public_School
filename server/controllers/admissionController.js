const Admission = require('../models/Admission');

exports.apply = async (req, res) => {
  const {
    studentName,
    dateOfBirth,
    classApplying,
    parentName,
    email,
    phone,
    previousSchool,
    address,
  } = req.body;
  const application = await Admission.create({
    studentName,
    ...(dateOfBirth ? { dateOfBirth } : {}),
    classApplying,
    parentName,
    email,
    phone,
    previousSchool,
    address,
  });
  res.status(201).json({
    success: true,
    message: `Application submitted! Your application number is ${application.applicationNo}. Save this for tracking.`,
    data: { applicationNo: application.applicationNo, status: application.status },
  });
};

exports.listApplications = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const [data, total] = await Promise.all([
    Admission.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Admission.countDocuments(filter),
  ]);
  res.json({ success: true, total, page, pages: Math.ceil(total / limit), data });
};

exports.updateStatus = async (req, res) => {
  const application = await Admission.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
  res.json({ success: true, data: application });
};