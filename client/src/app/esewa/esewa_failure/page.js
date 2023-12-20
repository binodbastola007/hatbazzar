'use client'
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const page = () => {
  return (
    <>
    <Navbar/>
    <div className='body'>
      <div style={{fontWeight:'bold'}}>
      Esewa failed !
      </div>
      <div>
        You might have insufficient balance or the error may be other. Please try again or contact esewa support.
      </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default page