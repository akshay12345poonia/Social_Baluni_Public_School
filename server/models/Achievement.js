const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    title: { type: String, required: true }, // "AIR 512 in JEE Advanced" / "NDA 150 Selection"
    type: {
      type: String,
      enum: ['iit', 'neet', 'nda', 'defence', 'board', 'sports', 'olympiad', 'other'],
      default: 'other',
      index: true,
    },
    detail: String,
    event: String, // "38th National Games Uttarakhand"
    year: { type: Number, default: () => new Date().getFullYear() },
    photo: String,
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Achievement', achievementSchema);