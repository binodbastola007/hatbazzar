'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Card from '@/app/components/Card';
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
                     return <Card details={details}/>
                  })
              }
            </div>
         </div>
         <Footer />

      </>
   );
}

export default page;
