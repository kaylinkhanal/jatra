const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'organizer', 'artist'],
    default: 'user',
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer not to say'],
    default: 'prefer not to say',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  interests: {
    type: [String], // Array of strings representing interests
    default: [],
  },
  preferences: {
    type: Object, // Store user preferences as a JSON object
    default: {},
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // [longitude, latitude]
    },
  },
  socialLinks: {
    type: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      // Add other social media links as needed
    },
    default: {},
  },
  bio: {
    type: String,
    default: null,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;