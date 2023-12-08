const ProductCard = require('../models/products');

const allProducts = async (req, res) => {
    const skipCount = (req.query.page - 1) * 12;
    const data = await ProductCard.find().limit(12).skip(skipCount);
    const totalCount = await ProductCard.find().count();

    if (data.length > 0) {
        res.json({ data, totalCount });
    }
    else {
        res.json({ msg: "No products in hatbazzar" });
    }
}

const addProducts = async (req, res) => {
    const product = {
        productName: req.body.productname,
        price: req.body.price,
        rating: req.body.rate,
        category: req.body.select,
        colors: req.body['select-multiple'],
        currency: req.body.suffix,
        description: req.body.intro,
        imageUrl: req.body.upload
    }
    try {

        const data = await ProductCard.create(product);
        if (data) {
            res.json({ msg: "Product sucessfully added in the listing" })
        }
        else {
            res.json({ msg: "Couldn't add the product.please try adding again" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            productName: req.body.productname,
            price: req.body.price,
            rating: req.body.rate,
            category: req.body.select,
            colors: req.body['select-multiple'],
            currency: req.body.suffix,
            description: req.body.intro,
            imageUrl: req.body.upload
        };
        const options = { new: true };
        const data = await ProductCard.findByIdAndUpdate(id, updatedData, options);
        if (data) {
            res.json({ msg: "Succesfully updated the product" });
        }
        else {
            res.json({ msg: "Couln't update the product" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const deleteProduct = async (req, res) => {
    try {
        const data = await ProductCard.deleteOne({ _id: req.params.id });
        if (data) {
            res.json({ msg: "Removed product from the listing" });
        }
        else {
            res.json({ msg: "Couln't remove the product" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const productDetails = async (req, res) => {
    try {
        const data = await ProductCard.findById(req.params.id);
        if (data) {
            res.json({ data });
        }
        else {
            res.json({ msg: "Couln't find the product description" })
        }
    }
    catch (err) {
        res.json({ msg: "Invalid product id" })
    }

}

const deleteProductImage = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = { imageUrl: req.body.images };
        const options = { new: true };
        const data = await ProductCard.findByIdAndUpdate(id, updatedData, options);
        if (data) {
            res.json({ msg: "Succesfully deleted the image" });
        }
        else {
            res.json({ msg: "Couln't delete the image" });
        }
    }
    catch (err) {
        console.log(err);
    }

}

const productCategories = async (req, res) => {
    const categories = ['Fashion and beauty', 'Electronics', 'Laptops',
        'Electronic assoceries', 'Mobiles and watchs', 'Groceries and pets',
        'Games and sports', 'Musical instruments']
    res.json({ categories });
}

const searchProducts = async (req, res) => {
    const data = await ProductCard.find({ "productName": { $regex: new RegExp(req.query.name, "i") } });
    res.json({ productList: data })
}

module.exports = { allProducts, addProducts, editProduct, deleteProduct, productDetails, deleteProductImage, productCategories, searchProducts };




