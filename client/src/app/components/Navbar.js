'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping, FaS } from 'react-icons/fa6';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { Dropdown, Space } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import '../styles/navBar.css'

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#9ddacc',
    }}
  />
);

const items = [
  {
    label: <a href="https://www.antgroup.com">Account information</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">Edit personal details</a>,
    key: '1',
  },
  {
    label: <a href="https://www.aliyun.com">Password and security</a>,
    key: '2',
  },
  {
    label: 'Log out',
    key: '3',
    danger: true
  },
];

const Navbar = (props) => {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('customer');
  const [loadings, setLoadings] = useState([]);


  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    // setTimeout(() => {
    //   setLoadings((prevLoadings) => {
    //     const newLoadings = [...prevLoadings];
    //     newLoadings[index] = false;
    //     return newLoadings;
    //   });
    // },6000);
  }

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
          onClick={() => router.push('/')}
        />

        <div className='searchBar'>
          <Space direction='vertical'>
            <Search
              className='search'
              placeholder="Search here in hatbazzar"
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={(value)=>props.setSearch(value)}
            />
          </Space>
        </div>
        <div className='account'>
          {!loggedIn &&
            (
              <>
                <Link href='/login' className='links'><span>Login</span></Link>
                <Link href='/register' className='links'><span>Signup</span></Link>
              </>
            )}

          {loggedIn &&
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
            <FaCartShopping color='white' size={30} />
            <text>0</text>
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
              <Button loading={loadings[0]} onClick={() => { enterLoading(0); props.setCategory('') }} style={{ color: 'black' }}>All</Button>
              <Button loading={loadings[1]} onClick={() => { enterLoading(1); props.setCategory('fashion and beauty') }} style={{ color: 'black' }}>Fashion and beauty</Button>
              <Button loading={loadings[2]} onClick={() => { enterLoading(2); props.setCategory('electronics') }} style={{ color: 'black' }}>Electronics</Button>
              <Button loading={loadings[3]} onClick={() => { enterLoading(3); props.setCategory('laptops') }} style={{ color: 'black' }}>Laptops</Button>
              <Button loading={loadings[4]} onClick={() => { enterLoading(4); props.setCategory('electronic assoceries') }} style={{ color: 'black' }}>Electronic assoceries</Button>
              <Button loading={loadings[5]} onClick={() => { enterLoading(5); props.setCategory('mobiles and watches') }} style={{ color: 'black' }}>Mobiles and watches</Button>
              <Button loading={loadings[6]} onClick={() => { enterLoading(6); props.setCategory('groceries and pets') }} style={{ color: 'black' }}>Groceries and pets</Button>
              <Button loading={loadings[7]} onClick={() => { enterLoading(7); props.setCategory('games and sports') }} style={{ color: 'black' }}>Games and sports</Button>
              <Button loading={loadings[8]} onClick={() => { enterLoading(8); props.setCategory('musical instruments') }} style={{ color: 'black' }}>Musical instruments</Button>
            </>
          )}
      </div>
    </div>
  )
}

export default Navbar;