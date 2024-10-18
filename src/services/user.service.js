const User = require('@models/user.model')
const { where } = require('sequelize')

async function getAllUsers() {
  return await User.findAll({
    attributes: [
      'id',
      'avatar',
      'username',
      'email',
      'role_id',
      'status',
      'created_at',
    ],
    order: ['id'],
  })
}
async function getUserByID(id) {
  return await User.findAll({
    attributes: [
      'id',
      'avatar',
      'username',
      'email',
      'role_id',
      'status',
      'created_at',
    ],
    where: {
      id: id,
    },
  })
}

module.exports = {
  getAllUsers,
  getUserByID,
}
