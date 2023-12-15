"use client";
import React from 'react';


const page = () => {

  const post = () => {

    var form = null;
    var currentTime = new Date();
    var formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' + currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();



    var ESEWA_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var t_amount = "100";
    var t_uidd = `${formattedTime}`;
    var p_code = "EPAYTEST";
    var s_key = "8gBm/:&EnhH.1/q";

    var hash = CryptoJS.HmacSHA256(`total_amount=${t_amount},transaction_uuid=${t_uidd},product_code=${p_code}`, `${s_key}`);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    const values = {
      amount: t_amount,
      tax_amount: "0",
      total_amount: t_amount,
      transaction_uuid: t_uidd,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: p_code,
      secret: s_key,
      signature: `${hashInBase64}`,
      signed_field_names: "total_amount, transaction_uuid, product_code",
      success_url: "https://esewa.com.np",
      failure_url: "https://google.com"
    }


    form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", ESEWA_URL);

    for (var key in values) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "text");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", values[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    // form.submit();
    console.log(form);
  };

return (
  <div>
    <button onClick={() => post()}>Pay with esewa</button>
  </div>
)
}

export default page