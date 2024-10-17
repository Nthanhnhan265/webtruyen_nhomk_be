const User = require('@models/user.model')

async function getAllUsers() {
  return await User.findAll()
}
async function getUser() {}

module.exports = {
  getAllUsers,
}
