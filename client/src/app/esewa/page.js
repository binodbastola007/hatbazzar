"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import cartSlice from '../GlobalRedux/Features/cart.slice';


const page = () => {

  const { orderId, totalAmount } = useSelector(state => state.cart);

  function post() {
    var path="https://uat.esewa.com.np/epay/main";
    var params= {
        amt: totalAmount,
        psc: 0,
        pdc: 500,
        txAmt: 0,
        tAmt: totalAmount + 500,
        pid: orderId,
        scd: "EPAYTEST",
        su: "http://localhost:3000/esewa/esewa_success",
        fu: "http://localhost:3000/esewa/esewa_failure"
    }

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);
  
      for(var key in params) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
      }
  
      document.body.appendChild(form);
      form.submit();
  } 

return (
  <div>
    <button onClick={() => post()}>Pay with esewa</button>
  </div>
)
}

export default page