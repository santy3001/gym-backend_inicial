const User = require('../schemas/user.schema');

const findAll = () => User.find().select('-password');
const findById = (id) => User.findById(id).select('-password');
const findByEmail = (email) => User.findOne({ email });
const create = (data) => User.create(data);
const update = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).select('-password');
const remove = (id) => User.findByIdAndDelete(id);

module.exports = { findAll, findById, findByEmail, create, update, remove };