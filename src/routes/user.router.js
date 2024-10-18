const express = require('express')
const userModel = require('@models/user.model')
const {
  handleGetUser,
  handleGetUserByID,
  handleCreateUser,
} = require('@controllers/user.controller')

const router = express.Router()
//===================
//User Create API Endpoints
//===================
router.post('/', handleCreateUser)

//===================
//User Read API Endpoints
//===================

// GET /users - Lấy danh sách tất cả người dùng
router.get('/', handleGetUser)

// GET /users/:id - Lấy thông tin chi tiết của một người dùng dựa trên ID
router.get('/:id', handleGetUserByID)

//===================
//User Update API Endpoints
//===================

router.get('/login', (req, res) => {
  res.send('<h1>login form</h1>')
})

module.exports = router
