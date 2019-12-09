const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
// Displayed because this is a test app
const DB_URI = "mongodb://localhost:27017/product"
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, ()=> console.log("Successfully connected to " + DB_URI)
);

app.set('view engine', 'ejs');

const Product = require('./model');

Product.create({
    name: 'Product',
    price: 200
}, (err,product)=>{
    if(!err){
        console.log(product)
    } else{
        console.log(err)
    }
})
Product.find({}, (err,products)=>{
    if(!err){
        console.log(products)
    } else{
        console.log(err)
    }
})
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
