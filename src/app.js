const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser:true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, ()=> console.log("Successfully connected to " + process.env.DB)
);
const Product = require('./model');
const seed = ()=>{
    for(var i=0; i<10; i++){
        Product.create({
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        }, (err,product)=>{
            if(!err){
                console.log(product)
            } else{
                console.log(err)
            }
        })
    }
}
// seed();

app.get('/', (req,res)=>{
    res.send("Hello world")
    // Product.find({}, (err,products)=>{
    //     if(!err){
    //        return res.status(200).render('index', {products: products, url:URL})
    //     } else{
    //         return res.status(404).status({err:err.message})
    //     }
    // })
})
app.get('/:prod/price', (req,res)=>{
    Product.findById(req.params.prod, (err,product)=>{
        if(!err){
           return res.status(200).json({price: product.price})
        } else{
            return res.status(404).status({err:err.message})
        }
    })

})

app.get('/success', (req,res)=>{
    let product = req.query.product;
    res.render('success', {product:product})
})

app.all("*", (req,res)=>{
    res.status(404).json({
        status: res.statusCode,
        message: 'Sorry, you seem to have lost your way... resource not found!'
    })
})
// const routes = require('./routes')
// app.use("/", routes);
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
