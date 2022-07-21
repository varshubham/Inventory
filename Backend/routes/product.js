const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Product = require('../models/Products')
const { body, validationResult } = require('express-validator');


//Route 1 : get all the Product using : Get 

router.get('/fetchall',fetchuser, async (req,res)=>{
    try{
    const product = await Product.find({user:req.user.id})
    res.json(product)
    }catch(error){
        res.status(500).send("Internal Server error")
    }
})

//route 2 : add a todo: post
router.post('/add',fetchuser,[
    body('pname','Enter a valid Name').isLength({min:3}),
    body('price','Must be positive').custom(value => { return value>=0})
],async (req,res)=>{
    try{
    const {pname,price,category} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const products = new Product({
        pname,price,category,user:req.user.id
    })
    const savedProduct = await products.save();

    res.json(savedProduct)
}catch(error){
    res.status(500).send("Internal Server error")
}
})

// route 3 : update a existing user
router.put('/update/:id',fetchuser,async (req,res)=>{
    try{
    const {pname,price,category} = req.body;
    const newProduct = {}
    if(pname){newProduct.pname = pname}
    if(price){newProduct.price = price}
    if(category){newProduct.category = category};
    
    
    //find the todo to be updated and update it
    let products =await Product.findById(req.params.id)
    if(!products){return res.status(404).send("Not found")}

    if(products.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    products = await Product.findByIdAndUpdate(req.params.id,{$set:newProduct},{new:true})
    res.json({products})
}catch(error){
    res.status(500).send("Internal Server error")
}
})

// route 4: deleting a todo
router.delete('/delete/:id',fetchuser,async (req,res)=>{
    try{
        // find the todo to be delete and delete it
        let products = await Product.findById(req.params.id);
        if(!products){return res.status(404).send("Not found")}
        
        if (products.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        products = await Product.findByIdAndDelete(req.params.id);
        res.json({"Success":"Todo has been deleted",product:products})
    }catch(error){
        res.status(500).send("Internal Server error")
    }
})
module.exports = router