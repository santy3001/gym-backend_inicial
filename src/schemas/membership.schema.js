const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['mensual', 'trimestral', 'anual'], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['activa', 'vencida', 'cancelada'], default: 'activa' },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Membership', membershipSchema);