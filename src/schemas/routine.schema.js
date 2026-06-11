const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      restSeconds: Number
    }
  ],
  difficulty: { type: String, enum: ['principiante', 'intermedio', 'avanzado'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Routine', routineSchema);