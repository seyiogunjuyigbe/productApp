const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const DB_URI = "mongodb://localhost:27017/product"
// const DB_URI = "mongodb+srv://user:user@cluster0-snlrs.mongodb.net/test?retryWrites=true&w=majority"



const routes = require('./routes')
app.use("/", routes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));


mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, ()=> console.log("Successfully connected to " + DB_URI)
);
const Product = require('./model');

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
