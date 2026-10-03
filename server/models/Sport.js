const mongoose = require('mongoose');
const slugify = require('slugify');

const sportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Cricket, Shooting, Fencing...
    slug: { type: String, unique: true, index: true },
    icon: String, // react-icon key
    coverImage: String,
    description: String,
    facilities: [String],
    coaches: [{ name: String, role: String, bio: String, photo: String }],
    achievements: [{ studentName: String, title: String, year: Number }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sportSchema.pre('validate', function (next) {
  if (this.name && !this.slug) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('Sport', sportSchema);