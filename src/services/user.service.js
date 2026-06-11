const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');

const getAll = () => userRepo.findAll();
const getById = (id) => userRepo.findById(id);

const create = async (data) => {
  const exists = await userRepo.findByEmail(data.email);
  if (exists) throw new Error('El correo ya está registrado');

  const hashed = await bcrypt.hash(data.password, 10);
  const user = await userRepo.create({ ...data, password: hashed });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone
  };
};

const update = (id, data) => userRepo.update(id, data);
const remove = (id) => userRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };