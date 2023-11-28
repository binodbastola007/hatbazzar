"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductContainer from '../components/ProductContainer';
import PriceContainer from '../components/PriceContainer';
import '../styles/cart.css'; 
import { useDispatch, useSelector } from "react-redux";
import { setSearchBarClose } from '../GlobalRedux/Features/navbar.slice';

const page = () => {

  const {productList} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSearchBarClose(true));
  })

  return (
    <>
       <Navbar/>
        <div className='body'>
            <div className='container'>
                <div className='productList'>
                    {productList.length>0&& productList.map((item)=>{
                        return <ProductContainer item={item}/>
                    })
                    }                 
                </div>
                <div className='totalPrice'>
                  <PriceContainer/>
                </div>
            </div>
        </div>
       <Footer/>
    </>
  )
}

export default page