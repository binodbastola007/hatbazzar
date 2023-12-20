'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';
import { setSearchBarClose } from '@/app/GlobalRedux/Features/navbar.slice';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '@/app/GlobalRedux/Features/navbar.slice';

const page = () => {

  const searchParams = useSearchParams();
  const {category} = useSelector(state=>state.navbar);
  const dispatch = useDispatch();
  const router = useRouter();

  const values = {
    oid: searchParams.get('oid'),
    amt: searchParams.get('amt'),
    refId: searchParams.get('refId')
  }

  const verify_esewa_payment = async () => {
    try {
      const res = await fetch("http://localhost:4000/verify-payment", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.log(err);
    }

  }

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
     if (hasPageBeenRendered.current) {
        router.push('/');
        dispatch(setCategory(category));
     }
     hasPageBeenRendered.current = true;
  }, [category]);

  useEffect(()=>{
    verify_esewa_payment();
    dispatch(setSearchBarClose(true));
  },[values])

  return (
    <>
    <Navbar />
     <div className='body'>
         <div style={{fontWeight:'bold'}}>
            Your payment has been successful !
         </div>
         <div >
            Your order id is {searchParams.get('oid')}
         </div>
     </div>
     <Footer/>
    </>
  )
}

export default page