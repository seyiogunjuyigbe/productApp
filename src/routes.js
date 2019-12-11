const express = require('express');
const  router = express.Router({mergeParams: true});
const path = require('path')
const URL = process.env.URL;
router.use(express.static(path.join(__dirname, '../public')));

const Product = require('./model');

router.get('/', (req,res)=>{
    Product.find({}, (err,products)=>{
        if(!err){
           return res.status(200).render('index', {products: products, url:URL})
        } else{
            return res.status(404).status({err:err.message})
        }
    })
})

router.get('/:prod/price', (req,res)=>{
    Product.findById(req.params.prod, (err,product)=>{
        if(!err){
           return res.status(200).json({price: product.price})
        } else{
            return res.status(404).status({err:err.message})
        }
    })

})

router.get('/success', (req,res)=>{
    let product = req.query.product;
    res.render('success', {product:product})
})

router.all("*", (req,res)=>{
    res.status(404).json({
        status: res.statusCode,
        message: 'Sorry, you seem to have lost your way... resource not found!'
    })
})

module.exports = router;