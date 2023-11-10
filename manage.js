const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

const app = express();

mongoose.connect(
    'mongodb+srv://moses:ix2Rlx3jN7VjdSOF@cluster0.qliuoq2.mongodb.net/'
    );
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','POST,PUT,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status= 404;
    next(error)
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;