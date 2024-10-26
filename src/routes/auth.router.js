const express = require('express')
const authRouter = express.Router()
const { handleLoginAdmin } = require('@controllers/auth.controller.js')
//=============== Authentication ===================//
//=========================
//sigin for admin, user
//=========================
authRouter.post('/admin/login', handleLoginAdmin)

//signup

//fresh token

module.exports = authRouter
