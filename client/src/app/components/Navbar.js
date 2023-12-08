'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping, FaS } from 'react-icons/fa6';
import { RiAccountCircleFill } from 'react-icons/ri';
import { ImCancelCircle } from "react-icons/im";
import { useRouter } from 'next/navigation';
import { Dropdown, Space } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../styles/navBar.css';
import { useSelector, useDispatch } from 'react-redux';
import {setAllData, setCategory, setCategoryArr, setSearch } from '@/app/GlobalRedux/Features/navbar.slice'
import { handleLogout } from '../GlobalRedux/Features/user.slice';
import { Avatar, Badge } from 'antd';


const Navbar = ({searchedData, setSearchedData}) => {

  const router = useRouter();
  const [user, setUser] = useState('customer');
  const [loadings, setLoadings] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelecetedItem] = useState(-1);
  const [allProducts,setAllProducts] = useState('');
  const [suggestionDivOpen,setSuggestionDivOpen] = useState(true); 
  const {isLoggedIn,userDetails} = useSelector(state=>state.user);


  const {allData, searchBarClose} = useSelector(state=>state.navbar);
  const dispatch = useDispatch();

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  }

  const items = [
    {
      label: <span style={{cursor:'default',padding:'8px',borderRadius:'5px',textAlign:'center',fontWeight:'bold'}}>Hi {userDetails.firstName} !</span>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">profile</a>,
      key: '1',
    },
    {
      label: <a href="https://www.aliyun.com">settings</a>,
      key: '2',
    },
    {
      label: <span onClick={()=>{
        dispatch(handleLogout());
        router.push('/');  
        }
        }>Log out</span>,
      key: '3',
      danger: true
    },
  ];

  const suffix = (
    <>
      <ImCancelCircle onClick={() => {
        setKeyword('');
        setSearchedData([]);
        setSelecetedItem(-1);
        dispatch(setSearch(''));
      }} size={20} style={{ cursor: 'pointer' }} />
    </>
  );

  const handleKeyDown = (e) => {
    setSuggestionDivOpen(true);
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelecetedItem(prev => prev - 1);
    }
    else if (e.key === "ArrowDown" && selectedItem < 9) {
      setSelecetedItem(prev => prev + 1);
    }
    else if (e.key == "Enter" && selectedItem >= 0 ) {
      const enterItem = searchedData[selectedItem];
      if(enterItem?.productName){
        setKeyword(enterItem.productName);
      }

    }
  }

  const handleSuggestionClick = (productName) => {
    setKeyword(productName);
    setSuggestionDivOpen(false);
  }

  const { productCount } = useSelector(state => state.cart);

  // useEffect(() => {
  //   if (keyword!=='') {
  //     const newFilteredData = allData.filter((items) => {
  //       return items.productName.toLowerCase().includes(keyword)
  //     })
  //     setSearchedData(newFilteredData);
  //   }
  //   if(keyword==''){
  //     dispatch(setSearch(''));
  //   }
  // }, [keyword])

  const fetchAllProducts = async()=>{
    if(keyword!==''){
      const res = await fetch('http://localhost:4000/search-products?name='+keyword);
      const data = await res.json();
      setSearchedData(data.productList);
    }
    if(keyword==''){
      dispatch(setSearch(''));
    }

  }
  useEffect(()=>{
     fetchAllProducts();
  },[keyword])


  return (
    <div>
      <div className='navBar'>
        <Image
          src='/logo.png'
          alt='logo'
          height={70}
          width={70}
          className='logo'
          priority
          onClick={() => {
            router.push('/');
            dispatch(setCategory(''));
            dispatch(setCategoryArr([]));
          }}
        />

        <div className='searchBar'>
          <Space direction='vertical'>
            <Search
              className={'search'}
              placeholder="Search here in hatbazzar"
              enterButton="Search"
              size="large"
              suffix={suffix}
              value={keyword}
              onKeyDown={handleKeyDown}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={(value) => dispatch(setSearch(value))}
              disabled={searchBarClose}
            />
          </Space>
          {(searchedData?.length > 0 && keyword !== '' && suggestionDivOpen) &&
            <div className='searchSuggesstion'>
              {searchedData.slice(0, 10).map((items, index) => {
                return <div key={index} onClick={() => handleSuggestionClick(items.productName)}
                  className={selectedItem === index ? "activeDiv" : "suggestionsDiv"} >{items.productName}</div>
              })}
            </div>
          }

        </div>
        <div className='account'>
          {!isLoggedIn &&
            (
              <>
                <Link href='/login' className='links'><text>Login</text></Link>
                <Link href='/register' className='links'><text>Signup</text></Link>
              </>
            )}

          {isLoggedIn &&
            (
              <div className='icon accountIcon'>

                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}

                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <RiAccountCircleFill size={35} color='white' />
                    </Space>
                  </a>
                </Dropdown>

              </div>
            )}

          <div className='icon'>
            <Badge count={productCount} showZero>
            <FaCartShopping color='white' size={30} onClick={()=>router.push('/cart')} />
            </Badge>
          </div>

        </div>
      </div>
      <div className='categories'>
        {(user === 'admin') &&
          (
            <>
              <Button loading={loadings[0]} style={{ color: 'black' }}
                onClick={() => {
                  enterLoading(0);
                  router.push('/');
                }
                }>All products</Button>
              <Button loading={loadings[1]} style={{ color: 'black' }}
                onClick={() => {
                  enterLoading(1);
                  router.push('/admin/addProduct');
                }
                }>Add products</Button>

              <Button loading={loadings[2]} style={{ color: 'black' }} onClick={() => {
                enterLoading(2);
                router.push('/admin/removeProduct');
              }
              }>Update/remove product</Button>

              <Button loading={loadings[3]} style={{ color: 'black' }}>Delete user</Button>
              <Button loading={loadings[4]} style={{ color: 'black' }}>Orders</Button>
            </>
          )}
        {(user === 'customer') &&
          (
            <>
              <Button loading={loadings[0]} onClick={() => { enterLoading(0); dispatch(setCategory('none')); dispatch(setCategoryArr([]))}} style={{ color: 'black' }}>All</Button>
              <Button loading={loadings[1]} onClick={() => { enterLoading(1); dispatch(setCategory('fashion and beauty')) }} style={{ color: 'black' }}>Fashion and beauty</Button>
              <Button loading={loadings[2]} onClick={() => { enterLoading(2); dispatch(setCategory('electronics')) }} style={{ color: 'black' }}>Electronics</Button>
              <Button loading={loadings[3]} onClick={() => { enterLoading(3); dispatch(setCategory('laptops')) }} style={{ color: 'black' }}>Laptops</Button>
              <Button loading={loadings[4]} onClick={() => { enterLoading(4); dispatch(setCategory('electronic assoceries')) }} style={{ color: 'black' }}>Electronic assoceries</Button>
              <Button loading={loadings[5]} onClick={() => { enterLoading(5); dispatch(setCategory('mobiles and watches')) }} style={{ color: 'black' }}>Mobiles and watches</Button>
              <Button loading={loadings[6]} onClick={() => { enterLoading(6); dispatch(setCategory('groceries and pets')) }} style={{ color: 'black' }}>Groceries and pets</Button>
              <Button loading={loadings[7]} onClick={() => { enterLoading(7); dispatch(setCategory('games and sports')) }} style={{ color: 'black' }}>Games and sports</Button>
              <Button loading={loadings[8]} onClick={() => { enterLoading(8); dispatch(setCategory('musical instruments')) }} style={{ color: 'black' }}>Musical instruments</Button>
            </>
          )}
      </div>
    </div>
  )
}

export default Navbar;