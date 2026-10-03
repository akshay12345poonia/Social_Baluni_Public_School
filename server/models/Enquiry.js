const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    parentName: String,
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    classApplying: String,
    message: String,
    source: { type: String, default: 'website' },
    status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);