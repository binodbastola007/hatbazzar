const ProductCard = require('../models/products');
const express = require('express');
const router = express.Router();

router.get('/products/all',async(req,res)=>{
    const data = await ProductCard.find();
    
    if(data.length>0){
      res.json({data});
     }
     else{
      res.json({msg:"No products in hatbazzar"});
     }
  })
  
router.post('/products/add',async(req,res)=>{   
     const product={
      productName:req.body.productname,
      price:req.body.price,
      rating:req.body.rate,
      category:req.body.select,
      colors:req.body['select-multiple'],
      currency:req.body.suffix,
      description:req.body.intro,
      imageUrl:req.body.upload
     }
     try{
      
      const data = await ProductCard.create(product);
      if(data){
        res.json({msg:"Product sucessfully added in the listing"})
       }
       else{
        res.json({msg:"Couldn't add the product.please try adding again"})
       }
     }
     catch(err){
      console.log(err);
     }
  
  })
  
  router.patch('/product/edit/:id',async(req,res)=>{
    try{
      const id = req.params.id;
      const updatedData = {
        productName:req.body.productname,
        price:req.body.price,
        rating:req.body.rate,
        category:req.body.select,
        colors:req.body['select-multiple'],
        currency:req.body.suffix,
        description:req.body.intro,
        imageUrl:req.body.upload
      };
      const options = { new: true };
      const data = await ProductCard.findByIdAndUpdate(id,updatedData,options);
      if(data){
        res.json({msg:"Succesfully updated the product"});
       }
       else{
        res.json({msg:"Couln't update the product"})
       }
    }
    catch(err){
      console.log(err);
    }
    
  })
  
  router.delete('/product/delete/:id',async(req,res)=>{
    try{
      const data = await ProductCard.deleteOne({_id:req.params.id});
      if(data){
        res.json({msg:"Removed product from the listing"});
       }
       else{
        res.json({msg:"Couln't remove the product"})
       }
    }
    catch(err){
      console.log(err);
    }
    
  })
  router.get('/product/description/:id',async(req,res)=>{
    try{
      const data = await ProductCard.findById(req.params.id);
      if(data){
        res.json({data});
       }
       else{
        res.json({msg:"Couln't find the product description"})
       }
    }
    catch(err){
      res.json({msg:"Invalid product id"})
    }
    
  })
  
  
  router.patch('/product/deleteimg/:id',async(req,res)=>{
    try{
      const id = req.params.id;
      const updatedData = {imageUrl:req.body.images};
      const options = { new: true };
      const data = await ProductCard.findByIdAndUpdate(id,updatedData,options);
      if(data){
        res.json({msg:"Succesfully deleted the image"});
       }
       else{
        res.json({msg:"Couln't delete the image"});
       }
    }
    catch(err){
      console.log(err);
    }
    
  })
  router.get('/product/categories',async(req,res)=>{
    const categories = ['Fashion and beauty','Electronics', 'Laptops',
     'Electronic assoceries', 'Mobiles and watchs', 'Groceries and pets',
      'Games and sports', 'Musical instruments']
      res.json({categories});
   })


module.exports=router;