//Require
require('dotenv').config()
require('module-alias/register')
const sequelize = require('@models/index.js')
const createError = require('http-errors')
const message = require('@root/message.js')
const cors = require('cors')
const path = require('path')
const express = require('express')
const config = require('./src/config/sys.config.js')
const app = express()
const userRouter = require('./src/routes/user.router.js')
const authorUser = require('./src/routes/author.router.js')
const authRouter = require('./src/routes/auth.router.js')
const story = require('./src/routes/stories.js')
const { verifyAccessToken } = require('./src/middlewares/auth.midleware.js')
const PORT = process.env.PORT
const multer = require('multer')
// const sequelize = require('./src/config/db_config.js')
// const usermodel = require('./src/models/user.model.js')

// configuration: static files, json() and urlencoded()
config(app, express)
app.use(cors({ credentials: true, origin: true }))

//middleware & router
// app.use(verifyAccessToken)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/', verifyAccessToken, authorUser)
app.use('/api/story/', verifyAccessToken, story)

//Middleware: error handler
app.use((req, res, next) => {
  next(createError(404, message.generalErrors.notFound))
})

// Middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.statusCode || 500,
    message: err.message || message.generalErrors.serverError,
  })
})

app.listen(PORT || 3001, () => {
  console.log(`server is running on ${PORT}`)
})
