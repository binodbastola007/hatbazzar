"use client";
import React,{useEffect,useRef} from 'react';
import { useSelector } from 'react-redux';
import cartSlice from '../GlobalRedux/Features/cart.slice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import '@/app/styles/cart.css';


const esewa = () => {

  const { orderId, totalAmount } = useSelector(state => state.cart);
  const { category } = useSelector(state => state.navbar);
  const router = useRouter();

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

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
      if (hasPageBeenRendered.current) {
          router.push('/');
      }
      hasPageBeenRendered.current = true;
  }, [category]);

return (
  <>
  <Navbar/>
  <div className='body'>
    <h3>Select your payment method</h3>
    <div className='paymentOptions'>
    <div className='paymentDiv'>
     <span>* Esewa:</span>
    <button className='epay' onClick={() => post()}>Pay via esewa</button>
    </div>
    </div>
  </div>
  <Footer/>
  </>
)
}

export default esewa;