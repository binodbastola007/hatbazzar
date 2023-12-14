"use client";
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';

const page = () => {

      const [signature, setSignature] = useState('');

      var currentTime = new Date();
      var formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();

      var amount = 100;
      var tax_amount = 10;
      var transaction_uuid = formattedTime;
      var total_amount = 5000;
      var product_code = "EPAYTEST";
      var secret = "8gBm/:&EnhH.1/q";

      const generateSignature=()=>{
            var hash = CryptoJS.HmacSHA256(`total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, `${secret}`);
            var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
            setSignature(hashInBase64);
      }




      return (
            <div>
                  <Helmet>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>
                  </Helmet>
                  <div className="container">
                        <h1 className="text-center mb-4">eSewa Payment Form</h1>
                        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                              <br /><br /><table style={{ width: '70%' }} align="center">
                                    <tbody><tr>
                                          <td> <strong>Parameter </strong> </td>
                                          <td><strong>Value</strong></td>
                                    </tr>
                                          <tr>
                                                <td>Amount:</td>
                                                <td> <input type="text" id="amount" name="amount" value={amount} className="form" required /> <br />
                                                </td>
                                          </tr>
                                          <tr>
                                                <td>Tax Amount:</td>
                                                <td><input type="text" id="tax_amount" name="tax_amount" value={tax_amount} className="form" required />
                                                </td>
                                          </tr>
                                          <tr>
                                                <td>Total Amount:</td>
                                                <td><input type="text" id="total_amount" name="total_amount" value={total_amount} className="form" required /> </td>
                                          </tr>
                                          <tr>
                                                <td>Transaction UUID:</td>
                                                <td><input type="text" id="transaction_uuid" name="transaction_uuid" value={`${transaction_uuid}`} className="form" required /> </td>
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
                                                <td><input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" className="form" required />
                                                </td>
                                          </tr>
                                          <tr>
                                                <td>Signature:</td>
                                                <td><input type="text" id="signature" name="signature" value={signature} className="form" required />
                                                <button onClick={()=>generateSignature()}>generateSignature</button>
                                                </td>
                                          </tr>
                                          <tr>
                                                <td>Secret Key:</td>
                                                <td><input type="text" id="secret" name="secret" defaultValue="8gBm/:&EnhH.1/q" className="form" required /> </td>
                                          </tr>
                                    </tbody></table>
                              <table style={{ width: '50%' }} align="center">
                                    <tbody><tr>
                                          <th>
                                                <input defaultValue=" Pay with eSewa " type="submit" className="button" />
                                          </th>
                                    </tr>
                                    </tbody></table>
                        </form>
                  </div>
            </div>

      )
}

export default page



