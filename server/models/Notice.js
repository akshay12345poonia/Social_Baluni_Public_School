const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fileUrl: String, // PDF link (fee schedule, circulars, date sheets)
    audience: { type: String, enum: ['all', 'parents', 'students', 'staff'], default: 'all' },
    isActive: { type: Boolean, default: true },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notice', noticeSchema);