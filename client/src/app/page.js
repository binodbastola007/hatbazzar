'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Card } from 'antd';
const { Meta } = Card;
import { Rate } from 'antd';
import { message } from 'antd';
import { Tooltip } from 'antd';
import { Button, Drawer } from 'antd';
import { useRouter } from 'next/navigation';
import { MdOutlineSettingsInputComponent } from "react-icons/md";

const index = () => {

   const [allData, setAllData] = useState([]);
   const [data, setData] = useState([]);
   const [category, setCategory] = useState([]);
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();

   const [open, setOpen] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   const fetchDetails = async (category) => {
      if (category == '') {
         try {
            const res = await fetch('http://localhost:4000/products/all');
            const result = await res.json();
            console.log(result);
            if (result.data.length > 0) {
               setAllData(result.data);
               setData(result.data);
            }
            else {
               messageApi.open({
                  type: 'error',
                  content: result.msg,
               });
            }
         }
         catch (err) {
            console.log(err);
         }
      }
      else if (category === 'fashion and beauty') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'electronics') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'laptops') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'electronic assoceries') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'mobiles and watches') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'groceries and pets') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'games and sports') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else if (category === 'musical instruments') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
      }
      else{
         setData(allData);
      }


   }

   const handleCheckbox=(e)=>{
      if(e.target.checked){
         setCategory(e.target.value);
      }
      else{
         setCategory('none');
      }
     
   }

   const handleCardClick = (id) => {
      router.push(`description/${id}`)
   }

   useEffect(() => {
      fetchDetails(category);
   }, [category])

   return (
      <>
         {contextHolder}
         <Navbar setCategory={setCategory} showDrawer={showDrawer} />
         <div className='body'>
            <button onClick={showDrawer} className='filterBtn'>
               <span style={{ color: 'white' }}>Filter</span>
               <MdOutlineSettingsInputComponent size={18} color='#9ddacc' style={{ alignItems: 'center' }} />
            </button>
            <div className='cardList'>
               {
                  (data.length > 0) && data.map((details) => {
                     return (

                        <div className='card'>
                           <Tooltip mouseEnterDelay={1} title="Click on the image to view product details">
                              <div className='cardPic' onClick={() => { handleCardClick(details._id) }}>
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
                              <span>Price: {details.currency + ' ' + details.price}</span>
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
         <Drawer title="Filter product/s" placement="right" onClose={onClose} open={open}>
            <div className='filterC'>
               <h3 className='filterHeading'>Category</h3>
               <div className='checkbox'><input type="checkbox" value='fashion and beauty' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Fashion and beauty</label></div>
               <div className='checkbox'><input type="checkbox" value='electronics' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Electronics</label></div>
               <div className='checkbox'><input type="checkbox" value='laptops' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Laptops</label></div>
               <div className='checkbox'><input type="checkbox" value='electronic assoceries' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Electronic assoceries</label></div>
               <div className='checkbox'><input type="checkbox" value='mobiles and watches' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Mobiles and watches</label></div>
               <div className='checkbox'><input type="checkbox" value='groceries and pets' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Groceries and pets</label></div>
               <div className='checkbox'><input type="checkbox" value='games and sports' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Games and sports</label></div>
               <div className='checkbox'><input type="checkbox" value='musical instruments' onChange={(e)=>handleCheckbox(e)}/>&nbsp;<label>Musical instruments</label></div>
            </div>
            <div className='filterP'>
               <h3 className='filterHeading'>Price</h3>
               <div className='priceFilter'>
                  <input placeholder='min' />-
                  <input placeholder='max' />
                  <button>Go</button>
               </div>
            </div>
            <div className='filterR'>
               <h3 className='filterHeading'>Ratings</h3>
               <div className='ratingsFilter'><Rate /></div>
            </div>


         </Drawer>
      </>


   );
}
export default index;