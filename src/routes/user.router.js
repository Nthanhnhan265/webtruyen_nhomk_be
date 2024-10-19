const express = require('express')
const userModel = require('@models/user.model')
const {
  handleGetUsers,
  handleGetUserByID,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUserByID: handleUpdateUser,
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
router.get('/', handleGetUsers)

// GET /users/:id - Lấy thông tin chi tiết của một người dùng dựa trên ID
router.get('/:id', handleGetUserByID)

//===================
//User Update API Endpoints
//===================
router.patch('/:id', handleUpdateUser)
//===================
//User Delete API Endpoints
//===================
router.delete('/:id', handleDeleteUser)

module.exports = router
