const mongoose = require('mongoose');

// Flexible key-value store: hero slides, stats counters, contact info, social links
const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model('Setting', settingSchema);