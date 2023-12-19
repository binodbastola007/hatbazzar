const Order = require('../models/order');

const saveOrder = async (req, res) => {
    try {
        const data = await Order.create({ orderItems: req.body });
        if (data) {
            res.json({ msg: "Sucessfully saved your cart/order", orderId: data._id })
        }
        else {
            res.json({ msg: "Couldn't create your order" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const addCheckoutDetails = async (req, res) => {
    const data = await Order.findByIdAndUpdate({ _id: req.params.id }, req.body)
    if (data) {
        res.json({ msg: 'Successfully added shipping details' });
    } else {
        res.json({ msg: 'Couldnot add shipping details' })
    }
}

const getOrderForPayment = async (req,res,next) => {
    try {
    const order = await Order.findById(req.body.oid);
    if (!order) {
    return res.status(400).json({ error: 'No order found' });
    }
    req.order = order;
    next();
}
    catch (err){
    return res.status(400).json({error: err?.message ||'No Order found'});
    }
}

module.exports = { saveOrder, addCheckoutDetails, getOrderForPayment };     