const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
// Displayed because this is a test app
// const config = require('./config');
const DB_URI = "mongodb+srv://user:user@cluster0-snlrs.mongodb.net/test?retryWrites=true&w=majority"
const URL = 'http://localhost:3000';

mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, ()=> console.log("Successfully connected to " + DB_URI)
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
const Product = require('./model');

Product.create({
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price())
}, (err,product)=>{
    if(!err){
        console.log(product)
    } else{
        console.log(err)
    }
})

app.get('/', (req,res)=>{
    Product.find({}, (err,products)=>{
        if(!err){
           return res.status(200).render('index', {products: products, url:URL})
        } else{
            return res.status(404).status({err:err.message})
        }
    })
})

app.get('/:prod/getPrice', (req,res)=>{
    Product.findById(req.params.prod, (err,product)=>{
        if(!err){
            res.json({price: product.price})
        } else{
            return res.status(404).status({err:err.message})
        }
    })

})
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
