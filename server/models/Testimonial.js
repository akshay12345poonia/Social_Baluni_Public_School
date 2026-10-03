const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Parent' }, // "Parent of Mohit Dobhal"
    className: String,
    message: { type: String, required: true },
    photo: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);