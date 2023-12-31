const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product:{type:String,required:true},
    quantity:{type:Number,required:true},
    price:{type:Number,required:true},
})

module.exports = mongoose.model('Product',productSchema)