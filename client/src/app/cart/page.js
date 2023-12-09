"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Products from '../components/Products';
import '../styles/cart.css';
import { useDispatch, useSelector } from "react-redux";
import { setSearchBarClose } from '../GlobalRedux/Features/navbar.slice';
import { setOrderId } from '../GlobalRedux/Features/cart.slice';
import { message } from 'antd';
import { BsFillCartXFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
import {Divider} from 'antd';
const { Option } = Select;

const page = () => {

  const { productList, orderId } = useSelector(state => state.cart);
  const { category } = useSelector(state => state.navbar);
  const [messageApi, contextHolder] = message.useMessage();
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const sumPrice = () => {
    let totalPrice = 0;
    productList.map((item) => {
      totalPrice = totalPrice + (item.price * item.quantity);
    })
    setTotal(totalPrice);
  }

  const handlePayment = async (total) => {
    const product_code = "EPAYTEST";
    const signedFieldsName = 'total, orderId, product_code';

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
    try {
      const res = await fetch('https://rc-epay.esewa.com.np/api/epay/main/v2/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(value)
      })
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }


  }

  useEffect(() => {
    sumPrice();
  }, [productList]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  })

  const handleSave = async (products) => {
    console.log(products);
    const res = await fetch('http://localhost:4000/save-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    })
    const data = await res.json();
    dispatch(setOrderId(data.orderId));
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
  }

  useEffect(() => {
    dispatch(setSearchBarClose(true));
  })

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      router.push('/');
    }
    hasPageBeenRendered.current = true;
  }, [category]);


  return (
    <>
      {contextHolder}
      <Navbar />
      <div className='body'>
       <div className='background'>
        <h3 style={{textAlign:'center',marginTop:'10px'}}>Your shopping cart</h3>
         <div className='containerCart'>
          <div className='productList'>
            {productList.length > 0 && productList.map((item) => {
              return <Products item={item} />
            })
            }

            {productList.length > 0 ?
              (<div><button disabled={(orderId !== '')} className={(orderId !== '' ? 'createdOrder' : 'saveBtn')}
                onClick={() => handleSave(productList)}>{orderId !== '' ? 'Cart has been saved !' : 'Save cart/order'}
              </button></div>)
              :
              (
                <>
                  <div className='emptyCart'>Your cart is empty !</div>
                  <BsFillCartXFill size={60} color='white' />
                </>
              )
            }

          </div>
          <div >
            <div className='priceContainer'>
              <div>
                <h3>PriceDetails</h3>

                <div className='priceDetails'>
                  <span >Total price : {total}</span>
                  <span >Quantity: {productList.length} items </span>
                  <span >Discount : 0 </span>
                  <span > Delivery charge : 0 </span>
                  <span >Price payable : {total}</span>
                </div>
                <Divider style={{backgroundColor:'black'}} />
                {(productList.length > 0 && orderId !== '') &&
                  (<>
                  <button className='checkoutBtn' onClick={() => router.push('/cart/checkout')}>Proceed to checkout
                  </button>
                  <br/>
                  <div className='paymentPartners'>
                  <span>We accept: </span><Image src='/esewa.png' width={100} height={50} alt='' />
                  </div>
                  </>)
                }
        <br/>
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>
      <Footer />
    </>
  )
}

export default page