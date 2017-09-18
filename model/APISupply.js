'use strict';

const mongoose = require('mongoose');

const APISupply = mongoose.Schema({
  name: { type: String, required: true },
  url: {type: String, required: true},
  desc: { type: String, required: true },
  examplesOfUse: {type: String, required: true},
  examplesInUse: {type: String, required: true},
  rating: {type: String, required: true},
  tokenRequired: {type: Boolean, required: true},
  tokenAccessWaitTime: {type: String, required: true},
  maxReqMin: {type: String, required: true},
  numUsersFav: {type: String, required: true},
  category: {type: String, required: true},

  userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('APISupply', APISupply);
