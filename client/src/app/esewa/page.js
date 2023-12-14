"use client";
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';

const page = () => {



    var currentTime = new Date();
    var formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();

    const handleSubmit = async () => {
        var amount = 100;
        var tax_amount =10;
        var transaction_uuid = formattedTime;
        var total_amount = 5000;
        var product_code = "EPAYTEST";
        var secret = "8gBm/:&EnhH.1/q";

        var hash = CryptoJS.HmacSHA256(`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, `${secret}`);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);


        const values = {
            amount: amount,
            failure_url: "https://google.com",
            product_delivery_charge: 0,
            product_service_charge: 0,
            product_code: product_code,
            signature: hashInBase64,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: "https://esewa.com.np",
            tax_amount: tax_amount,
            total_amount: total_amount,
            transaction_uuid: transaction_uuid,
            secret: secret
        }

 try{
    const res = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/form', {
        method: 'POST',
        mode: "no-cors",
        'Content-Type': 'application/x-www-form-urlencoded',
        body: JSON.stringify(values)
    })
    const data = await res.json();
    console.log(data);
    }
 catch(err){
    console.log(err);
 }
}


    return (
        <div>
            <Helmet>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>
            </Helmet>
          <button onClick={()=>handleSubmit()}>Pay with esewa</button>
        </div>
    )
}

export default page