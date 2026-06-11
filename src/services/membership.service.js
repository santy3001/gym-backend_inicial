const repo = require('../repositories/membership.repository');

const getAll = () => repo.findAll();
const getById = (id) => repo.findById(id);
const getByUser = (userId) => repo.findByUser(userId);
const create = (data) => repo.create(data);
const update = (id, data) => repo.update(id, data);
const remove = (id) => repo.remove(id);

module.exports = { getAll, getById, getByUser, create, update, remove };