require('dotenv').config(); 
const path = require('path')
const express = require('express'); 
const config = require('./config/config');
const app = express(); 
const PORT = process.env.PORT
// configuration: static files, json() and urlencoded()
config(app,express); 

app.listen(PORT || 3001,()=>{
    console.log(`server is running on ${PORT}`); 
})