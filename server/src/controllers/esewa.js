const FormData = require("form-data");
const fetch = require('node-fetch');
const Payment = require('../models/payment');

const verifyPayment = async (req, res, next) => {
    try{
        const { amt, refid, oid } = req.body;
        var form = new FormData();
        form.append('amt', amt);
        form.append('rid', refid);
        form.append('pid', oid);
        form.append('scd', "EPAYTEST");
    
        const response = await fetch(
            'https://uat.esewa.com.np/epay/transrec',
            {
            method: 'POST',
            body: form
            }
        );
            const body = await response.text(4);
            console.log(body);
            if (body.includes("Success")){
            next();
            }
    
    }
    catch(err){
        console.log(err);
        return res.status(400).json({error:err.message});
    }
   
}

const createPayment = async (req, res) => {
try {
   req.body.user = req.order.user; 
req.body.source_payment_.id = req.body.refId;
req.body.amount = req.body.amt;
req.body.order = req.order._id;
const product = new Payment(req.body);
const createdPayment = await product.save();
res.json({ message: "Payment Created Sucessfully", product: createdPayment });
}
catch (err){
return res.status(400).json({ error: err?.message || 'No Payments found' }) ;
}
}

module.exports = {verifyPayment, createPayment};