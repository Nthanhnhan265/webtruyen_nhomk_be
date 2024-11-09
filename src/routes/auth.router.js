const express = require('express')
const authRouter = express.Router()
const {
  handleLoginAdmin,
  handleRefreshToken,
  handleLoginUser,
  handleRegisterUser,
} = require('@controllers/auth.controller.js')

//=============== Authentication ===================//
//=========================
//sign in for admin
//=========================
authRouter.post('/login', handleLoginAdmin)

//=========================
//sign in for user
//=========================
authRouter.post('/', handleLoginUser)

//========================
//sign up for user
//========================
authRouter.post('/', handleRegisterUser)

//fresh token
authRouter.post('/admin/refresh-token', handleRefreshToken)

module.exports = authRouter
