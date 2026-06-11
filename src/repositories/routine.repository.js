const Routine = require('../schemas/routine.schema');

const findAll = () => Routine.find().populate('trainer', 'name');
const findById = (id) => Routine.findById(id).populate('trainer', 'name');
const create = (data) => Routine.create(data);
const update = (id, data) => Routine.findByIdAndUpdate(id, data, { new: true });
const remove = (id) => Routine.findByIdAndDelete(id);

module.exports = { findAll, findById, create, update, remove };