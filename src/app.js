const express = require('express');
const faker = require('faker');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes')
app.use("/", routes);

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
seed();
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Connected to ${port}`))
