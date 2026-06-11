// Barrel export de todos los repositorios
module.exports = {
  userRepo:       require('./user.repository'),
  membershipRepo: require('./membership.repository'),
  routineRepo:    require('./routine.repository'),
  classRepo:      require('./class.repository'),
};
