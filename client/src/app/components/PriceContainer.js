import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PriceDetails = () => {

  const [total, setTotal] = useState(0);
  const { productList, orderId } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const sumPrice = () => {
    let totalPrice = 0;
    productList.map((item) => {
      totalPrice = totalPrice + (item.price * item.quantity);
    })
    setTotal(totalPrice);
  }

  const handlePayment = async (total) => {
    const product_code = "EPAYTEST";
    const signedFieldsName =  'total, orderId, product_code';

    var hash = CryptoJS.HmacSHA256(signedFieldsName, "8gBm/:&EnhH.1/q");
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
   

    const value = {
      amount: total,
      failure_url: "https://google.com",
      product_delivery_charge: 0,
      product_service_charge: 0,
      product_code: "EPAYTEST",
      signature: hashInBase64,
      signed_field_names: signedFieldsName,
      success_url: "https://esewa.com.np",
      tax_amount: 0,
      total_amount: total,
      transaction_uuid: orderId
    }
try{
  const res = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/form', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
   },
    body: JSON.stringify(value)
  })
  const data = await res.json();
  console.log(data);
}catch(err){
  console.log(err);
}


  }

  useEffect(() => {
    sumPrice();
  }, [productList]);

  useEffect(()=>{
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () =>{
      document.body.removeChild(script);
    }
  })

  return (
    <div className='priceContainer'>
      <h3>PriceDetails</h3>
      <div className='priceDetails'>
        <span>Total price : {total}</span>
        <span>Quantity: {productList.length} items </span>
        <span>Discount : N/A </span>
        <span> Delivery charge : N/A </span>
        <span>Price payable : {total}</span>

        {(productList.length>0 && orderId!=='')&&
          <button className='payBtn' onClick={() => handlePayment(total)}>Pay with esewa
          </button>
        }
        
      </div>
        {/* <div>
        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
 <input type="text" id="amount" name="amount" value="100" required/>
 <input type="text" id="tax_amount" name="tax_amount" value ="10" required/>
 <input type="text" id="total_amount" name="total_amount" value="110" required/>
 <input type="text" id="transaction_uuid" name="transaction_uuid"required/>
 <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required/>
 <input type="text" id="product_service_charge" name="product_service_charge" value="0" required/>
 <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required/>
 <input type="text" id="success_url" name="success_url" value="https://esewa.com.np" required/>
 <input type="text" id="failure_url" name="failure_url" value="https://google.com" required/>
 <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
 <input type="text" id="signature" name="signature"  required />
 <input value="Submit" type="submit"/>
 </form>
        </div> */}
    </div>

  )
}

export default PriceDetails