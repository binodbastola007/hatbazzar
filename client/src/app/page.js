'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './components/Card';
import { Rate } from 'antd';
import { message } from 'antd';
import { Button, Drawer } from 'antd';
import { useRouter } from 'next/navigation';
import { IoSettings } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { setAllData, setCategory, setSearchBarClose } from '../app/GlobalRedux/Features/navbar.slice';
import Sider from 'antd/es/layout/Sider';
import Advertisement from './components/Carousel';
import Scroll from './components/Scroll';


const index = () => {

   const [data, setData] = useState([]);
   const [count, setCount] = useState(0);
   const [searchedData, setSearchedData] = useState([]);
   const [categoryArr, setCategoryArr] = useState([]);
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [rating, setRating] = useState('');
   const [searchBtnClick, setSearchBtnClick] = useState(false);
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();

   const { allData, category, search  } = useSelector(state => state.navbar);
   const dispatch = useDispatch();

   const [open, setOpen] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };
   const onClose = () => {
      setOpen(false);
   };

   const fetchDetails = async (category, page = 1) => {
      if (category == '') {
         try {
            const res = await fetch('http://localhost:4000/products/all?page=' + page);
            const result = await res.json();
            console.log(result);
            if (result.data.length > 0) {
               dispatch(setAllData(result.data));
               setData(result.data);
               setCount(result.totalCount);
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
      else {
         try {
            const res = await fetch(`http://localhost:4000/products?page=${page}&category=${category}`);
            const result = await res.json();
            if (result.data.length > 0) {
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

   }

   const fetchProducts = async(cate) =>{
      try {
         const res = await fetch(`http://localhost:4000/filterProducts?category=${cate}`);
         const result = await res.json();
         if (result.data.length > 0) {
            return result.data;
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

   useEffect(()=>{

      const products = new Array;

      if(categoryArr.length>0){
         categoryArr.map(async(cate)=>{
            const filteredData = await fetchProducts(cate);
            products.push(...filteredData); 
         })
      } 
    console.log(products);
    const myData = [...products];
    console.log("my data", myData);
       
   },[categoryArr])

   const handleCategoryFilter =async(e) => {
      let value = e.target.value;
      if (e.target.checked) {
         if(!(categoryArr.includes(value))){
            setCategoryArr((prev)=>[...prev,value]);
         }
      } else {
         const index = categoryArr.indexOf(value);
         const newCategoryArr = [...categoryArr] ;
         newCategoryArr.splice(index,1);
         setCategoryArr([...newCategoryArr]);
      }
   }

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
      //  scroll to top on page load
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   }, [data]);


   useEffect(() => {
      fetchDetails(category);
      dispatch(setSearchBarClose(false));
   }, [category])



   useEffect(() => {
      setData(searchedData);
      if (search !== '' && searchedData == '') {
         messageApi.open({
            type: 'error',
            content: "No products found, please search with different keyword",
         });
         setData([...allData]);
      }
      if (search == '') {
         setData([...allData]);
      }
   }, [search])

   return (
      <>
         {contextHolder}
         <Navbar searchedData={searchedData} setSearchedData={setSearchedData} setSearchBtnClick={setSearchBtnClick} />
         <div className='body'>
            <div className='carousel'>
               {(search == '' && category == '') && <Advertisement />}
            </div>
            {/* <div>
               {
                  products.map((items)=>{
                     return <h2>{items.productName}</h2>
                  })
               }
            </div> */}
            <div className='productHeading'>
               {category ? <h3>Category: {category}</h3>
                  :
                  (search == '') ? <h3>Browse our products</h3> : <h3>Your search result/s:</h3>
               }
               {search == '' &&
                  <div className='filterBtn' onClick={showDrawer}>
                     <span>Filter products</span>
                     <IoSettings size={25} />
                  </div>
               }
            </div>

            <div className='cardList'>
               {
                  (data?.length > 0) && data.map((details) => {
                     return <Card details={details} />
                  })
               }
            </div>
            <br />
            <div className='pagination'>
               <Pagination onChange={(page) => fetchDetails(category, page)} defaultCurrent={1} total={count} />
               <Scroll />
            </div>
            <br />
         </div>
         <Footer />
         <Drawer title="Filter product/s" placement="right" onClose={onClose} open={open}>
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
export default index;