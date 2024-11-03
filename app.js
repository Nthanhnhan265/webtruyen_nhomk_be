// Require modules
require('dotenv').config()
require('module-alias/register')

const createError = require('http-errors')
const message = require('@root/message.js')
const cors = require('cors')
const express = require('express')
const config = require('./src/config/sys.config.js') // Configuration setup
const app = express()

// Import routers
const userRouter = require('./src/routes/user.router.js')
const authorUser = require('./src/routes/author.router.js')
const storyRouter = require('./src/routes/stories.js')
const chapterRouter = require('./src/routes/chapter.router.js') // Fixed name to chapter.router.js
const authRouter = require('./src/routes/auth.router.js')

// Configuration: static files, JSON parsing, and urlencoded
config(app, express)
app.use(cors({ credentials: true, origin: true }))

// Middleware & router
// Uncomment if needed: app.use(verifyAccessToken)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/', verifyAccessToken, authorUser)
app.use('/api/story/', verifyAccessToken, storyRouter)
app.use('/api/chapter', verifyAccessToken, chapterRouter) // Ensure proper route

// Middleware: error handler for 404
app.use((req, res, next) => {
  next(createError(404, message.generalErrors.notFound))
})

// Middleware: generic error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.statusCode || 500,
    message: err.message || message.generalErrors.serverError,
  })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
