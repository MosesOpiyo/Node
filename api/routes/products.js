const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Product = require('../models/products')


router.get('/', (req,res,next)=>{
    Product.find()
    .select('product quantity price')
    .exec()
    .then(docs =>{
     if(docs){
        const reponse = {
            count:docs.length,
            products:docs
        }
        res.status(200).json(reponse)
     }else{
        res.status(404).json({
            message:"No entries."
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
            message:`Product ${result.product} has been created`
        })
    }).catch(error =>{
        console.log(error)
    })
    
})

router.patch('/:productId', (req,res,next)=>{
    const id = req.params.productId
    const updateOps = {}
    for(const op of req.body){
       updateOps[op.propName] = op.value
    }
    Product.updateOne({_id:id},{ $set: updateOps})
    .exec()
    .then(result =>{
     if(result){
        const reponse = {
            product:"Product has been successfully updated."
        }
        res.status(200).json(reponse)
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

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId
    Product.findById(id)
    .select('product quantity price')
    .exec()
    .then(docs =>{
     if(docs){
        const reponse = {
            product:docs
        }
        res.status(200).json(reponse)
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