const Membership = require('../schemas/membership.schema');

const findAll = () => Membership.find().populate('user', 'name email');
const findById = (id) => Membership.findById(id).populate('user', 'name email');
const findByUser = (userId) => Membership.find({ user: userId });
const create = (data) => Membership.create(data);
const update = (id, data) => Membership.findByIdAndUpdate(id, data, { new: true });
const remove = (id) => Membership.findByIdAndDelete(id);

module.exports = { findAll, findById, findByUser, create, update, remove };