'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Card } from 'antd';
const { Meta } = Card;
import { Rate } from 'antd';
import {  message } from 'antd';
import { Tooltip } from 'antd';
import {useRouter} from 'next/navigation';

const index = () => {

   const [data,setData] = useState([]);
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();

   const fetchDetails = async () => {
      try {
         const res = await fetch('http://localhost:4000/products/all');
         const result = await res.json();
         console.log(result);
         if(result.data.length>0){
            setData(result.data);
         }
         else{
            messageApi.open({
               type:'error',
               content: result.msg,
               });
         }     
      }
      catch(err){
         console.log(err);
      }
   }

   const handleCardClick = (id) =>{
      router.push(`description/${id}`)
   }

   useEffect(() => {
      fetchDetails();
   },[])

   return (
      <>
         {contextHolder}
         <Navbar />
         <div className='body'>
         <div className='cardList'>
         {
            (data.length>0) && data.map((details)=>{
              return (
               
               <div className='card'>
               <Tooltip mouseEnterDelay={1} title="Click on the image to view product details">
                  <div className='cardPic' onClick={()=>{handleCardClick(details._id)}}>
                     <Image
                        src={`${details.imageUrl[0]}`}
                        alt='product_card'
                        height={200}
                        width={200}
                        priority
                     />
                  </div>
                 </Tooltip>
                  <div className='cardDescription'>
                     <span className='cardTitle'>{details.productName}</span>
                     <span>Price: {details.currency+' '+details.price}</span>
                     <span>Ratings:<Rate disabled value={details.rating} /></span>
                     <div className='cardBtn'>
                        <button className='buyNow'>Buy now</button>
                        <button className='addToCart'>Add to cart</button>
                     </div>
                  </div>
                 
               </div>
          
            )
            })
           
         }
         </div>
         </div>
         <Footer />

      </>


   );
}
export default index;