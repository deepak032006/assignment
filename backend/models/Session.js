const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  tags: [String],
  json_url: String,
  is_published: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Session', SessionSchema);
