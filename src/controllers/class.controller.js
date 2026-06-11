const service = require('../services/class.service');

const getAll = async (req, res) => {
  try { res.json(await service.getAll()); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

const getById = async (req, res) => {
  try { res.json(await service.getById(req.params.id)); }
  catch (e) { res.status(404).json({ error: e.message }); }
};

const create = async (req, res) => {
  try { res.status(201).json(await service.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const update = async (req, res) => {
  try { res.json(await service.update(req.params.id, req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const enroll = async (req, res) => {
  try { res.json(await service.enroll(req.params.id, req.body.userId)); }
  catch (e) { res.status(400).json({ error: e.message }); }
};

const remove = async (req, res) => {
  try { 
    await service.remove(req.params.id);
    res.json({ message: 'Clase eliminada' }); 
  }
  catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { getAll, getById, create, update, enroll, remove };