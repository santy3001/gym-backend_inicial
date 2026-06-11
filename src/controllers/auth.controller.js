const service = require('../services/auth.service');

const register = async (req, res) => {
  try {
    res.status(201).json(await service.register(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    res.json(await service.login(req.body));
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = { register, login };
