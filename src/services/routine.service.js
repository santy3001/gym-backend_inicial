const repo = require('../repositories/routine.repository');

const getAll = () => repo.findAll();
const getById = (id) => repo.findById(id);
const create = (data) => repo.create(data);
const update = (id, data) => repo.update(id, data);
const remove = (id) => repo.remove(id);

module.exports = { getAll, getById, create, update, remove };