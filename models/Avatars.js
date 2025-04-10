const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('avatars', avatarSchema);
