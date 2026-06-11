const Class = require('../schemas/class.schema');

const findAll = () =>
  Class.find()
    .populate('trainer', 'name email')
    .populate('enrolled', 'name email');

const findById = (id) =>
  Class.findById(id)
    .populate('trainer', 'name email')
    .populate('enrolled', 'name email');

const create = (data) => Class.create(data);

const update = (id, data) =>
  Class.findByIdAndUpdate(id, data, { new: true });

const enroll = async (id, userId) => {
  const gymClass = await Class.findById(id);
  if (!gymClass) throw new Error('Clase no encontrada');
  if (gymClass.enrolled.length >= gymClass.capacity)
    throw new Error('La clase ya alcanzó su capacidad máxima');
  if (gymClass.enrolled.includes(userId))
    throw new Error('El usuario ya está inscrito en esta clase');

  gymClass.enrolled.push(userId);
  await gymClass.save();
  return gymClass.populate('trainer', 'name email');
};

const remove = (id) => Class.findByIdAndDelete(id);

module.exports = { findAll, findById, create, update, enroll, remove };
