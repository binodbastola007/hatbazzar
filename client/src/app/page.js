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
import { setAllData, setCategory, setCategoryArr, setSearchBarClose } from '../app/GlobalRedux/Features/navbar.slice';
import Sider from 'antd/es/layout/Sider';
import Advertisement from './components/Carousel';
import Scroll from './components/Scroll';


const index = () => {

   const [data, setData] = useState([]);
   const [searchedData, setSearchedData] = useState([]);
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');
   const [rating, setRating] = useState('');
   const [messageApi, contextHolder] = message.useMessage();
   const router = useRouter();

   const { allData, category, categoryArr, search } = useSelector(state => state.navbar);
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
         setData(filteredData);
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
      console.log(category);
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
         <Navbar searchedData={searchedData} setSearchedData={setSearchedData} />
         <div className='body'>
            <div className='carousel'>
               <Advertisement />
            </div>
            <div className='productHeading'>
              <h3>Browse our products</h3>
              <div className='filterBtn' onClick={showDrawer}>
                <span>Filter products</span>
               <IoSettings  size={25} />
              </div>
            </div>

            <div className='cardList'>
               {
                  (data.length > 0) && data.map((details) => {
                     return <Card details={details} />
                  })
               }
            </div>
            <br/>
            <div className='pagination'>
            <Pagination onChange={(page) => fetchDetails(category, page)} defaultCurrent={1} total={data.length} />
            <Scroll/>
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