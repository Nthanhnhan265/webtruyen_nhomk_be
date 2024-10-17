require('dotenv').config(); 
const path = require('path')
const express = require('express'); 
const config = require('./config/config');
const app = express(); 
const api = require('./routes/api.js'); 
const PORT = process.env.PORT
// configuration: static files, json() and urlencoded()
config(app,express); 
app.use('/user',api)
app.listen(PORT || 3001,()=>{
    console.log(`server is running on ${PORT}`); 
})