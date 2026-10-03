const mongoose = require('mongoose');
const slugify = require('slugify');

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    category: {
      type: String,
      enum: ['sports', 'events', 'academics', 'campus', 'achievements', 'hostel'],
      default: 'events',
      index: true,
    },
    coverImage: String,
    images: [{ url: String, caption: String }],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

albumSchema.pre('validate', function (next) {
  if (this.title && !this.slug) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('GalleryAlbum', albumSchema);