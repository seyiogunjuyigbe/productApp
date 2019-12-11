const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.URL
const DB  = process.env.DB

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));


mongoose.Promise = global.Promise;
mongoose.connect(DB, {
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, ()=> console.log("Successfully connected to " + DB)
);
const Product = require('./model');


const routes = require('./routes')
app.use("/", routes);
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
