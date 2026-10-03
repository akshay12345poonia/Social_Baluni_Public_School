const mongoose = require('mongoose');
const slugify = require('slugify');

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // "IIT-JEE Integrated", "NDA & Defence"
    slug: { type: String, unique: true, index: true },
    tagline: String,
    description: String,
    icon: String,          // react-icon key e.g. "FaAtom"
    image: String,
    highlights: [String],  // bullet features
    stats: {
      selections: { type: Number, default: 0 },
      studentsEnrolled: { type: Number, default: 0 },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

programSchema.pre('validate', function (next) {
  if (this.name && !this.slug) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('Program', programSchema);