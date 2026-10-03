const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    summary: { type: String, maxlength: 300 },
    content: String,
    coverImage: String,
    category: {
      type: String,
      enum: ['announcement', 'result', 'event', 'sports', 'academic', 'achievement'],
      default: 'announcement',
    },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

newsSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now()
      .toString()
      .slice(-5)}`;
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);