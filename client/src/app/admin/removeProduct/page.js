'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Card } from 'antd';
const { Meta } = Card;
import { Rate } from 'antd';
import { message } from 'antd';
import { Tooltip } from 'antd';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'antd';
import '../../styles/removeProduct.css';
import { useRouter } from 'next/navigation';

const page = () => {

   const [data, setData] = useState([]);
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();

   const [open, setOpen] = useState(false);
   const showModal = () => {
      setOpen(true);
   };
   const hideModal = () => {
      setOpen(false);
   };

   const fetchDetails = async () => {
      try {
         const res = await fetch('http://localhost:4000/products/all');
         const result = await res.json();
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

   useEffect(() => {
      fetchDetails();
   },[])

   const handleDelete = async (currentCard) => {
      const id = currentCard._id;
      const res = await fetch(`http://localhost:4000/product/delete/${id}`, {
         method: 'DELETE'
      });
      const data = await res.json();
      messageApi.open({
         type: res.status == 200 ? 'success' : 'error',
         content: data.msg,
      });
      setOpen(false);
      fetchDetails();
   }

   return (
      <>
         <Navbar />
         {contextHolder}
         <div className='body'>
            <div className='cardList'>
               {
                  (data.length>0) && data.map((details) => {
                     return (

                        <div className='card' key={details._id} >
                           <>
                             <Tooltip title="Edit details">
                              <AiFillEdit size={30} className='editBtn' onClick={()=>router.push(`/admin/editProduct/${details._id}`)} />
                             </Tooltip>
                             <Tooltip title="Delete product">
                              <RiDeleteBin7Fill size={30} className='deleteBtn' onClick={()=>showModal()}/>
                              </Tooltip>
                              <Modal
                                 title="Remove Product"
                                 mask={false}
                                 open={open}
                                 onOk={()=>handleDelete(details)}
                                 onCancel={hideModal}
                                 okText="Yes"
                                 cancelText="Cancel"
                              >
                                 <p>Are you sure you want to remove this product?</p>
                                  <br/>
                                 <p style={{color:'#c90808'}}>(Note: Removing the product will permanently remove it from our database.)</p>
                              </Modal>
                           </>
                           <div className='cardPic'>
                              <Image
                                 src={`${details.imageUrl[0]}`}
                                 alt='product_card'
                                 height={200}
                                 width={200}
                                 priority
                              />
                           </div>
                           <div className='cardDescription'>
                              <span className='cardTitle'>{details.productName}</span>
                              <span>Price: {details.currency + ' ' + details.price}</span>
                              <span>Ratings:<Rate disabled value={details.rating} /></span>
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

export default page;
