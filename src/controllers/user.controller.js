const { getAllUsers, getUserByID } = require('@services/user.service')

async function handleGetUser(req, res, next) {
  let data = []
  data = await getAllUsers()
  return res.status(200).json({
    success: true,
    message: 'user retrieved successfully',
    data: data,
  })
}

async function handleGetUserByID(req, res, next) {
  const id = req.params.id
  console.log('>>>id: ' + id)
  let data = []
  data = await getUserByID(id)
  return res.status(200).json({
    success: true,
    message: 'user retrieved successfully',
    data: data,
  })
}

module.exports = {
  handleGetUser,
  handleGetUserByID,
}
