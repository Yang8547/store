const express = require('express');
const productModel =  require('../models/productModel');

const router = express.Router();

router.post('/addProduct', (req,res)=>{
    const product =  new productModel({
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        countInStock: req.body.countInStock,
        rating:req.body.rating,
        numReviews:req.body.numReviews

    })
    product.save().then(data=>{
        res.send(data)
    }).catch(error=>{
        console.error(error.message)
    })
})

router.get('/',(req,res)=>{
    productModel.find().then(data=>{
            res.send(data)
        }     
    ).catch(error=>{
        console.error(error.message)
    })
})

module.exports = router;