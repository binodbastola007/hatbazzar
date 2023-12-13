"use client";
import React,{useState, useEffect} from 'react'
import { Helmet } from 'react-helmet';

const page = () => {

    const [signature, setSignature] = useState('');

    function signatureGeneration(){
        var hash = CryptoJS.HmacSHA256(total_amount,transaction_uuid,product_code);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        setSignature(hashInBase64);
    }

    
    const amount = "100";
    const tax_amount = "10";
    const transaction_uuid = "564654654hjgh";
    const total_amount = "5000";
    const product_code = "EPAYTEST";


    return (
        <div>
            <Helmet>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1
                      /crypto-js.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1
                      /hmac-sha256.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1
                       /enc-base64.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
                       
            </Helmet>
            <button onClick={()=>signatureGeneration()}>Signature Generation button</button>
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="text" id="amount" name="amount" value={amount} required />
                <input type="text" id="tax_amount" name="tax_amount" value={tax_amount} required />
                <input type="text" id="total_amount" name="total_amount" value={total_amount} required />
                <input type="text" id="transaction_uuid" name="transaction_uuid" value={transaction_uuid} required />
                <input type="text" id="product_code" name="product_code" value={product_code} required />
                <input type="text" id="product_service_charge" name="product_service_charge" value="0" required />
                <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
                <input type="text" id="success_url" name="success_url" value="https://esewa.com.np" required />
                <input type="text" id="failure_url" name="failure_url" value="https://google.com" required />
                <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
                <input type="text" id="signature" name="signature" value={signature} required />
                <input value="Submit" type="submit" />
            </form>

        </div>
    )
}

export default page