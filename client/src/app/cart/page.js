"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductContainer from '../components/ProductContainer';
import PriceContainer from '../components/PriceContainer';
import '../styles/cart.css'; 
import { useDispatch, useSelector } from "react-redux";
import { changeProductList } from '../GlobalRedux/Features/cart.slice';

const page = () => {

  const {productList} = useSelector(state => state.cart);
    const dispatch = useDispatch();

  return (
    <>
       <Navbar/>
        <div className='body'>
            <div className='container'>
                <div className='productList'>
                    <ProductContainer/>
                </div>
                <div className='totalPrice'>
                  <PriceContainer/>
                </div>
                {JSON.stringify(productList)}
            </div>
        </div>
       <Footer/>
    </>
  )
}

export default page