const express = require('express')
const authRouter = express.Router()
const {
  handleLogin,
  handleRefreshToken,
  handleLoginUser,
  handleRegister,
} = require('@controllers/auth.controller.js')

//=============== Authentication ===================//
//=========================
//sign in for admin, user
//=========================
authRouter.post('/login', handleLogin)

//=========================
//sign in for user
//=========================
// authRouter.post('/', handleLoginUser)

//========================
//sign up for user
//========================
authRouter.post('/register', handleRegister)

//fresh token
authRouter.post('/refresh-token', handleRefreshToken)

module.exports = authRouter
