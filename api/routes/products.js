const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:"GET Request to /products processing...."
    })
})
router.get('/:productId', (req,res,next)=>{
   const Id = req.params.productId
   res.status(200).json({
    message:`GET Request to /products/${Id} processing....`
})
})
router.post('/', (req,res,next)=>{
    res.status(200).json({
        message:"POST Request to /products processing...."
    })
})

module.exports = router;