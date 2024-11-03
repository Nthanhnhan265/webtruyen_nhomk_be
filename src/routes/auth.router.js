const express = require('express')
const authRouter = express.Router()
const {
  handleLoginAdmin,
  handleRefreshToken,
} = require('@controllers/auth.controller.js')
//=============== Authentication ===================//
//=========================
//sigin for admin, user
//=========================
authRouter.post('/admin/login', handleLoginAdmin)

//signup

//fresh token
authRouter.post('/admin/refresh-token', handleRefreshToken)
module.exports = authRouter
