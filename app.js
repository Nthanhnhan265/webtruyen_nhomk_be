//Require

require('dotenv').config();
const path = require('path')
const express = require('express');
const config = require('./config/config');
const app = express();
const api = require('./routes/author.router.js');
app.use(express.json());
const PORT = process.env.PORT
const sequelize = require('./config/db_config.js');
const cors = require('cors');
// configuration: static files, json() and urlencoded()
config(app, express);
app.use(cors({ credentials: true, origin: true }));
app.use('/api', api)
sequelize.sync().then(() => {
  console.log('Database synced');
});


app.listen(PORT || 3001, () => {
  console.log(`server is running on ${PORT}`);
})
app.use(express.urlencoded({ extended: true }));