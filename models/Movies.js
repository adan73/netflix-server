const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '',
  }
}, { _id: false });

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true, 
  },

  isSeries: {
    type: Boolean,
    default: false,
  },

  cover: {
    type: Boolean,
    default: false, 
  },

  lists: {
    type: [String], 
    default: [],
  },

  type: {
    type: String, 
    default: '',
  },

  year: {
    type: String, 
    default: '',
  },

  seasons: {
    type: String, 
    default: '',
  },

  maturityRating: {
    type: String, 
    default: '',
  },

  director: {
    type: String,
    default: '',
  },

  cast: {
    type: String,
    default: '',
  },

  myList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },

  episodes: {
    type: [episodeSchema],
    default: [],
  },

  screenshots: {
    type: [String], 
    default: [],
  },
  titleImage: {
    type: [String], 
    default: [],
  },
  rank: {
    type: String, 
    default:'',
  }
});

module.exports = mongoose.model('movies', movieSchema);
