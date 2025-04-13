const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  myList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
});

module.exports = mongoose.model('users', userSchema);
