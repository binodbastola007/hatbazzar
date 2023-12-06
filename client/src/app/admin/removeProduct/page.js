'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { Rate } from 'antd';
import { message } from 'antd';
import { Tooltip } from 'antd';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'antd';
import { Drawer } from 'antd';
import { IoSettings } from "react-icons/io5";
import '../../styles/removeProduct.css';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setAllData ,setCategory, setCategoryArr, setSearchBarClose } from '@/app/GlobalRedux/Features/navbar.slice';

const page = () => {

   const [data, setData] = useState([]);
   const [searchedData, setSearchedData] = useState([]);
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [rating, setRating] = useState('');

   const { allData, category, categoryArr, search } = useSelector(state => state.navbar);
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();
   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);
   const showModal = () => {
      setOpen(true);
   };
   const hideModal = () => {
      setOpen(false);
   };

   const [openDrawer, setOpenDrawer] = useState(false);
   const showDrawer = () => {
      setOpenDrawer(true);
   };
   const onClose = () => {
      setOpenDrawer(false);
   };

   const fetchDetails = async (category) => {
      if (category == '') {
         try {
            const res = await fetch('http://localhost:4000/products/all');
            const result = await res.json();
            console.log(result);
            if (result.data.length > 0) {
               dispatch(setAllData(result.data));
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
         return filteredData;
      }
      else if (category === 'electronics') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })

         return filteredData;
      }
      else if (category === 'laptops') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else if (category === 'electronic assoceries') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else if (category === 'mobiles and watches') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else if (category === 'groceries and pets') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else if (category === 'games and sports') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else if (category === 'musical instruments') {
         const filteredData = allData.filter((item) => {
            return (item.category === category);
         })
         setData(filteredData);
         return filteredData;
      }
      else {
         setData(allData);
      }


   }

   const handleCategoryFilter = (e) => {
      let value = e.target.value;
      if (e.target.checked) {
         if (!categoryArr.includes(value)) {
            dispatch(setCategoryArr([...categoryArr, value]));
         }
      }
      else {
         const updatedArr = [...categoryArr];
         const index = updatedArr.indexOf(value);
         updatedArr.splice(index, 1);
         dispatch(setCategoryArr([...updatedArr]));
      }
   }

   useEffect(() => {
      if (categoryArr.length == 0) {
         setData([...allData]);
      }
      else if (categoryArr.length > 0) {
         categoryArr.map(async (items, index) => {
            const filteredProducts = await fetchDetails(items);
            if (index == 0) {
               setData(filteredProducts);
            }
            else {
               setData((prev) => [...prev, ...filteredProducts])
            }
         })
      }
      else return;

   }, [categoryArr]);

   const handlePriceFilter = () => {
      const filteredData = allData.filter((item) => {
         return (item.price >= minPrice && item.price <= maxPrice)
      })
      setData([...filteredData]);
   }


   const handleRatingFilter = (value) => {
      setRating(value);
      const filteredData = allData.filter((item => {
         return (item.rating === value);
      }))
      setData([...filteredData]);
   }

   useEffect(() => {
      fetchDetails(category);
      dispatch(setSearchBarClose(false));
   }, [category])

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

   useEffect(()=>{
      setData(searchedData);
      if(search!=='' && searchedData==''){
         messageApi.open({
            type: 'error',
            content: "No products found, please search with different keyword",
         });
         setData([...allData]);
      }
      if(search==''){
         setData([...allData]);
      }
   },[search])

   return (
      <>
         <Navbar searchedData={searchedData} setSearchedData={setSearchedData}/>
         {contextHolder}
         {contextHolder}
         <div className='body'>
         <span className='filterBtn'>
               <IoSettings onClick={showDrawer} size={25}/>
            </span>
            <div className='cardList'>
               {
                  (data.length > 0) && data.map((details) => {
                     return (

                        <div className='card' key={details._id} >
                           <>
                              <Tooltip title="Edit details">
                                 <AiFillEdit size={30} className='editBtn' onClick={() => router.push(`/admin/editProduct/${details._id}`)} />
                              </Tooltip>
                              <Tooltip title="Delete product">
                                 <RiDeleteBin7Fill size={30} className='deleteBtn' onClick={() => showModal()} />
                              </Tooltip>
                              <Modal
                                 title="Remove Product"
                                 mask={false}
                                 open={open}
                                 onOk={() => handleDelete(details)}
                                 onCancel={hideModal}
                                 okText="Yes"
                                 cancelText="Cancel"
                              >
                                 <p>Are you sure you want to remove this product?</p>
                                 <br />
                                 <p style={{ color: '#c90808' }}>(Note: Removing the product will permanently remove it from our database.)</p>
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
         <Drawer title="Filter product/s" placement="right" onClose={onClose} open={openDrawer}>
            <div className='filterC'>
               <h3 className='filterHeading'>Category</h3>
               <div className='checkbox'><input type="checkbox" value='fashion and beauty' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Fashion and beauty</label></div>
               <div className='checkbox'><input type="checkbox" value='electronics' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Electronics</label></div>
               <div className='checkbox'><input type="checkbox" value='laptops' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Laptops</label></div>
               <div className='checkbox'><input type="checkbox" value='electronic assoceries' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Electronic assoceries</label></div>
               <div className='checkbox'><input type="checkbox" value='mobiles and watches' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Mobiles and watches</label></div>
               <div className='checkbox'><input type="checkbox" value='groceries and pets' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Groceries and pets</label></div>
               <div className='checkbox'><input type="checkbox" value='games and sports' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Games and sports</label></div>
               <div className='checkbox'><input type="checkbox" value='musical instruments' onChange={(e) => handleCategoryFilter(e)} />&nbsp;<label>Musical instruments</label></div>
            </div>
            <div className='filterP'>
               <h3 className='filterHeading'>Price</h3>
               <div className='priceFilter'>
                  <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder='min' />-
                  <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder='max' />
                  <button onClick={handlePriceFilter}>Go</button>
               </div>
            </div>
            <div className='filterR'>
               <h3 className='filterHeading'>Ratings</h3>
               <div className='ratingsFilter'><Rate onChange={(e) => handleRatingFilter(e)} /></div>
            </div>


         </Drawer>
      </>
   );
}

export default page;
