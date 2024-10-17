const express = require('express')
const userModel = require('@models/user.model')
const { handleGetUser } = require('@controllers/user.controller')
const router = express.Router()
// get all users
router.get('/', handleGetUser)
router.get('/login', (req, res) => {
  res.send('<h1>login form</h1>')
})

module.exports = router
