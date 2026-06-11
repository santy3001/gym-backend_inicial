const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async ({ name, email, password, role, phone }) => {
  const exists = await userRepo.findByEmail(email);
  if (exists) throw new Error('El correo ya está registrado');

  const hashed = await bcrypt.hash(password, 10);
  const user = await userRepo.create({ name, email, password: hashed, role, phone });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
};

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error('Usuario no encontrado');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  };
};

module.exports = { register, login };
