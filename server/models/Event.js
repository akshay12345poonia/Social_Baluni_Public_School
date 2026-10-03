const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    description: String,
    coverImage: String,
    location: { type: String, default: 'SBPS Campus, Dehradun' },
    startDate: { type: Date, required: true, index: true },
    endDate: Date,
    category: { type: String, default: 'school' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.pre('validate', function (next) {
  if (this.title && !this.slug)
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now()
      .toString()
      .slice(-5)}`;
  next();
});

module.exports = mongoose.model('Event', eventSchema);