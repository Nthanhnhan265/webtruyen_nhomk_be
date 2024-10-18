//Require
require('dotenv').config()
require('module-alias/register')
const cors = require('cors')
const path = require('path')
const express = require('express')
const config = require('./src/config/config.js')
const app = express()
const userRouter = require('./src/routes/user.router.js')
const { log } = require('console')
const PORT = process.env.PORT
// const sequelize = require('./src/config/db_config.js')
// const usermodel = require('./src/models/user.model.js')

// configuration: static files, json() and urlencoded()
config(app, express)
app.use(cors({ credentials: true, origin: true }))

//middleware & router
app.use('/api/users', userRouter)

app.listen(PORT || 3001, () => {
  console.log(`server is running on ${PORT}`)
})
