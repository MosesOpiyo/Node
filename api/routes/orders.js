const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Order = require('../models/orders')
const Product = require('../models/products')

router.get('/', (req,res,next)=>{
    Order.find()
    .select('_id product')
    .exec()
    .then(result =>{
        if(result){
            const response = {
                count: result.length,
                orders: result
            }
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message:"No entries."
            })
        }
    }
    )
    .catch(err =>{
        res.status(500).json({
            status: 500,
            error: err
        })
    })
})

router.get('/:orderId', (req,res,next)=>{
    const id = req.params.orderId
    Order.findOne(id)
    .exec()
    .then(result =>{
        if(result){
            const response = {
                order: result
            }
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message:`No entry for order ID: ${id}`
            })
        }
    }
    )
    .catch(err =>{
        res.status(500).json({
            status: 500,
            error: err 
        })
    })
})

router.post('/', (req,res,next)=>{
    Product.findById(req.body.product)
    .then(product =>{
        if(product){
            const order = new Order({
                _id:new mongoose.Types.ObjectId,
                product:req.body.product
            })
            order.save()
            res.status(201).json({
                _id:order._id,
                ordered_product:{
                    id:product._id,
                    product:product.product,
                    quantity:product.quantity,
                    price:product.price, 
                }
            })
        }else{
            res.status(404).json({
                message:`Product: ${req.body.product} not found`
            })
        }
        
    } 
    ).catch(error =>{
        console.log(error)
    })
    
    
})

module.exports = router;