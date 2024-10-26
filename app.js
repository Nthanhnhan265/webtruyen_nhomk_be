// Require modules
require('dotenv').config();
require('module-alias/register');

const createError = require('http-errors');
const message = require('@root/message.js');
const cors = require('cors');
const path = require('path');
const express = require('express');
const config = require('./src/config/sys.config.js'); // Chọn config phù hợp
const app = express();

// Import routers
const userRouter = require('./src/routes/user.router.js');
const authorUser = require('./src/routes/author.router.js');
const story = require('./src/routes/stories.js');
const chapterRoutes = require('./src/routes/chapter.routes.js'); // Nếu cần thêm
const authRouter = require('./src/routes/auth.router.js'); // Nếu cần thêm

// Logger and PORT setup
const { log } = require('console');
const PORT = process.env.PORT;

// const sequelize = require('./src/config/db_config.js')
// const usermodel = require('./src/models/user.model.js')

// configuration: static files, json() and urlencoded()
config(app, express)
app.use(cors({ credentials: true, origin: true }))

//middleware & router
app.use('/api/users', userRouter)
app.use('/api/', authorUser)
app.use('/api/story/', story)
app.use('/api/', authRouter)
app.use("/api", chapterRoutes);


//Middleware: error handler
app.use((req, res, next) => {
  next(createError(404, message.generalErrors.notFound))
})

// Middleware
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message || message.generalErrors.serverError,
  })
})

app.listen(PORT || 3001, () => {
  console.log(`server is running on ${PORT}`)
})
