const repo = require('../repositories/class.repository');

const getAll = () => repo.findAll();
const getById = (id) => repo.findById(id);
const create = (data) => repo.create(data);
const update = (id, data) => repo.update(id, data);
const enroll = (id, userId) => repo.enroll(id, userId);
const remove = (id) => repo.remove(id);

module.exports = { getAll, getById, create, update, enroll, remove };