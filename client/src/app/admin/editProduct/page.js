'use client'
import React from 'react'
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import '../../styles/editProduct.css';

const page = () => {
  return (
    <>
    <Navbar/>
    <div className='body'>
       <div className='editBox'>
         <h3 className='title'>Edit your product details in hatbazzar</h3>
          <div>Edit your product name</div>
          <div>Edit product image</div>
          <div>Change product category </div>
          <div>Edit product colors</div>
          <div>Edit product price</div>
          <div>Edit product rating</div>
          <div>Edit product description</div>
       </div>
    </div>
    <Footer/>
    </>
  )
}

export default page