const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: { type: Date, required: true },
  capacity: { type: Number, required: true },
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  location: { type: String, default: 'Sala principal' }
});

module.exports = mongoose.model('Class', classSchema);