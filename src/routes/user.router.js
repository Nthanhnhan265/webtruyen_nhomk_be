const express = require('express')
const userModel = require('@models/user.model')
const {
  handleGetUser,
  handleGetUserByID,
} = require('@controllers/user.controller')
const router = express.Router()
// get all users
router.get('/', handleGetUser)
router.get('/:id', handleGetUserByID)

router.get('/login', (req, res) => {
  res.send('<h1>login form</h1>')
})

module.exports = router
