"use client";

import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductContainer from '../components/ProductContainer';
import PriceContainer from '../components/PriceContainer';
import '../styles/cart.css';
import { useDispatch, useSelector } from "react-redux";
import { setSearchBarClose } from '../GlobalRedux/Features/navbar.slice';
import { setOrderId } from '../GlobalRedux/Features/cart.slice';
import { message } from 'antd';
import { BsFillCartXFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';

const page = () => {

  const { productList, orderId } = useSelector(state => state.cart);
  const { category } = useSelector(state => state.navbar);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async (products) => {
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
        <div className='containerCart'>
          <div className='productList'>
            {productList.length > 0 && productList.map((item) => {
              return <ProductContainer item={item} />
            })
            }

            {productList.length>0 ?
              (<div><button disabled={(orderId !== '')} className={(orderId!==''?'createdOrder':'saveBtn')}
              onClick={() => handleSave(productList)}>{orderId !== '' ? 'Order has been created !' : 'Save to Cart'}
            </button></div>)
              :
              (
                <>
                <div className='emptyCart'>Your cart is empty !</div>
                <BsFillCartXFill size={60} color='white'/>
                </>
              )
            }

          </div>
          <div className='totalPrice'>
            <PriceContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default page