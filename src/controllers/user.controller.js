const { getAllUsers } = require('@services/user.service')

async function handleGetUser(req, res, next) {
  let data = []
  data = await getAllUsers()
  return res.status(200).json({
    success: true,
    message: 'user retrieved successfully',
    data: data,
  })
}

module.exports = {
  handleGetUser,
}
