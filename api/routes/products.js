const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/products')


router.get('/', (req,res,next)=>{
    Product.find()
    .exec()
    .then(docs =>{
     if(docs){
        res.status(200).json(docs)
     }else{
        res.status(404).json({
            message:"No entry for provided ID."
        })
     }
    })
})
router.post('/', (req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        product: req.body.product,
        quantity:req.body.quantity,
        price:req.body.price
    })
    product.save().then(result =>{
        res.status(201).json({
            result
        })
    }).catch(error =>{
        console.log(error)
    })
    
})
router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(docs =>{
     if(docs){
        res.status(200).json(docs)
     }else{
        res.status(404).json({
            message:"No entry for provided ID."
        })
     }
    })
    .catch(err =>{
     res.status(500).json({
         status: 500,
         error: err
     })
    })
 })

module.exports = router;