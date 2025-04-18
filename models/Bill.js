const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  name: String,
  meterNumber: String,
  units: Number,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bill', billSchema);
