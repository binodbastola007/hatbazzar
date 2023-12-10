const express = require('express');
const router = express.Router();
const { allProducts,productsByCategory, addProducts, editProduct, deleteProduct, productDetails, deleteProductImage, productCategories, searchProducts } = require('../controllers/products');

router.get('/products/all', allProducts);

router.get('/products', productsByCategory);

router.post('/products/add', addProducts)

router.patch('/product/edit/:id', editProduct)

router.delete('/product/delete/:id', deleteProduct)

router.get('/product/description/:id', productDetails)

router.patch('/product/deleteimg/:id', deleteProductImage)

router.get('/product/categories', productCategories)

router.get('/search-products', searchProducts)


module.exports = router;