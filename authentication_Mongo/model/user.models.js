const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  notifications: {
    orders: { type: Boolean, default: true },
    reviews: { type: Boolean, default: true },
    weekly: { type: Boolean, default: true },
    marketing: { type: Boolean, default: true },
    stock: { type: Boolean, default: true }
  },
  verificationCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordCode: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
module.exports = mongoose.model('User', userSchema);