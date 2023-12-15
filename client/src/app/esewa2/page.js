"use client"
import React,{useRef} from 'react';

const page = () => {


    const inputRef = useRef(null);

    const generateSignatures=()=>{
      var hash =  CryptoJS.HmacSHA256(`total_amount=100,transaction_uuid=11-20012,product_code=EPAYTEST`, "8gBm/:&EnhH.1/q");
      var hashInBase64 =  CryptoJS.enc.Base64.stringify(hash);
      inputRef.current.value = hashInBase64;
    }


  return (
    <div>
       <div className="container">
  <h1 className="text-center mb-4">eSewa Payment Form</h1>
  <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" onSubmit={()=>generateSignatures()}>
    <br /><br /><table style={{width: '70%'}} align="center">
      <tbody><tr> 
          <td> <strong>Parameter </strong> </td>
          <td><strong>Value</strong></td> 
        </tr>
        <tr>
          <td>Amount:</td>
          <td> <input type="text" id="amount" name="amount" defaultValue={100} className="form" required /> <br /></td>
        </tr>
        <tr>
          <td>Tax Amount:</td>
          <td><input type="text" id="tax_amount" name="tax_amount" defaultValue={0} className="form" required /> </td>
        </tr>
        <tr>
          <td>Total Amount:</td>
          <td><input type="text" id="total_amount" name="total_amount" defaultValue={100} className="form" required /> </td>
        </tr>
        <tr>
          <td>Transaction UUID:</td>
          <td><input type="text" id="transaction_uuid" name="transaction_uuid" defaultValue="11-20012" className="form" required /></td>
        </tr>
        <tr>
          <td>Product Code:</td>
          <td><input type="text" id="product_code" name="product_code" defaultValue="EPAYTEST" className="form" required /> </td>
        </tr>
        <tr>
          <td>Product Service Charge:</td>
          <td><input type="text" id="product_service_charge" name="product_service_charge" defaultValue={0} className="form" required /> </td>
        </tr>
        <tr>
          <td>Product Delivery Charge:</td>
          <td><input type="text" id="product_delivery_charge" name="product_delivery_charge" defaultValue={0} className="form" required /> </td>
        </tr>
        <tr>
          <td>Success URL:</td>
          <td><input type="text" id="success_url" name="success_url" defaultValue="https://esewa.com.np" className="form" required /> </td>
        </tr>
        <tr>
          <td>Failure URL:</td>
          <td><input type="text" id="failure_url" name="failure_url" defaultValue="https://google.com" className="form" required /> </td>
        </tr> 
        <tr>
          <td>signed Field Names:</td>
          <td><input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" className="form" required /> </td>
        </tr>
        <tr>
          <td>Signature:</td>
           
          <td><input type="text" id="signature" name="signature" ref={inputRef} defaultValue={0} className="form" required /> </td>
        </tr>
        <tr>
          <td>Secret Key:</td>
          <td><input type="text" id="secret" name="secret" defaultValue="8gBm/:&EnhH.1/q" className="form" required /> </td>
        </tr>
      </tbody></table>
    <table style={{width: '50%'}} align="center">
      <tbody><tr><th>
            <input defaultValue=" Pay with eSewa " type="submit" className="button" />
          </th></tr>
      </tbody></table>
  </form>
</div>
    </div>
  )
}

export default page