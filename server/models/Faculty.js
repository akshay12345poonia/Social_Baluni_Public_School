const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: String,
    department: String,
    qualification: String,
    experience: String,
    photo: String,
    message: String,
    isLeadership: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);