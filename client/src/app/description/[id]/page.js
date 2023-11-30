'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { message } from 'antd';
import { useParams } from 'next/navigation';
import { Rate } from 'antd';
import { Breadcrumb } from 'antd';
import '../../styles/description.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { buyNow, addToCart } from "../../GlobalRedux/Features/cart.slice.js";
import { setCategory, setSearchBarClose } from '@/app/GlobalRedux/Features/navbar.slice';

const page = () => {

   const [data, setData] = useState({});
   const [images, setImages] = useState([]);
   const [path, setPath] = useState('');
   const [colors, setColors] = useState([]);
   const dispatch = useDispatch();
   const [addStatus, setAddStatus] = useState(false);
   const { productList } = useSelector(state => state.cart);
   const { category } = useSelector(state => state.navbar);
   const [messageApi, contextHolder] = message.useMessage();
   const params = useParams();
   const router = useRouter();

   const handlePurchase = async (details) => {

      var newData = true;

      await productList.map((items) => {
         if (items.id === details._id) {
            router.push('/cart');
            newData = false;
         }
      })

      if (newData) {

         const productInfo = {
            id: details._id,
            productName: details.productName,
            price: details.price,
            imageUrl: details.imageUrl[0],
            quantity: 1,

         }
         dispatch(buyNow(productInfo));
         setAddStatus(true);
         router.push('/cart');
      }

   }

   const handleCart = async (details) => {

      var newData = true;

      await productList.map((items) => {
         if (items.id === details._id) {
            newData = false;
            messageApi.open({
               type: 'error',
               content: "Item already exist in the cart",
            })
         }
      })

      if (newData) {
         const productInfo = {
            id: details._id,
            productName: details.productName,
            price: details.price,
            imageUrl: details.imageUrl[0],
            quantity: 1,

         }
         dispatch(addToCart(productInfo));
         setAddStatus(true);
      }


   }

   const fetchProduct = async (id) => {
      try {
         const res = await fetch(`http://localhost:4000/product/description/${id}`);
         const result = await res.json();
         if (result.data) {
            setData(result.data);
            setImages(result.data.imageUrl);
            setColors(result.data.colors)
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

   const hasPageBeenRendered = useRef(false);

   useEffect(() => {
      if (hasPageBeenRendered.current) {
         router.push('/');
      }
      hasPageBeenRendered.current = true;
   }, [category]);



   useEffect(() => {
      fetchProduct(params.id);
      dispatch(setSearchBarClose(true));
   }, [])

   return (
      <>
         <Navbar />
         {contextHolder}
         <div className='body'>
            <div className='container'>
               <Breadcrumb
                  separator='>'
                  items={[
                     {
                        title: <a href="/">Home</a>,
                     },
                     {
                        title: 'Category',
                     },
                     {
                        title: `${data.category}`,
                     },
                     {
                        title: `${data.productName}`,
                     },
                  ]}
                  style={{marginLeft:'10px'}}
               />
               <div className='details'>
                  <div className='imagesArray'>
                     {images.map((item, index) => {
                        return (
                           <>
                              <Image key={index} onClick={() => setPath(item)} src={item} alt='' height={70} width={70} className='img' /> &nbsp;
                           </>
                        )
                     })}
                  </div>
                  <div className='productImg'>
                     <Image
                        src={path ? path : images[0]}
                        alt='product_img'
                        width={550}
                        height={550}

                        priority
                        style={{ border: 'none' }}
                     />
                  </div>
                  <div className='productDetails'>
                     <span className='name'>Product name: {data.productName}</span>
                     <span className='category'>Category: {data.category}</span>
                     <span className='colors'>
                        Available colors:&nbsp;
                        {(colors.length > 0) &&
                           (colors.map((item, index) => {
                              if (index === colors.length - 1) {
                                 return item;
                              }
                              return item + ',' + ' ';
                           })
                           )
                        }
                     </span>
                     <span className='price'>Price: {data.currency} {data.price}</span>
                     <Rate disabled value={data.rating} />

                     <div className='productButtons'>
                        <button onClick={() => handlePurchase(data)}>Buy now</button>
                        <button className={addStatus && 'addIntoCart'} onClick={() => handleCart(data)} disabled={addStatus}>{addStatus ? 'Added !' : 'Add to cart'}</button>
                     </div>

                     <div className='descriptionBox'>
                        <h4>Product Details</h4>
                        <div className='description'>
                           <span>{data.description}</span>
                        </div>
                        <div className='rating'>
                           <span>({data.rating}/5) </span>
                           <Rate disabled value={data.rating} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>

   )
}

export default page;