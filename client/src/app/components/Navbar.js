import React ,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import {RiAccountCircleFill} from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { Dropdown, Space } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
import { AudioOutlined } from '@ant-design/icons';

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#9ddacc',
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

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
    danger:true
  },
];

const Navbar = () => {
   const router = useRouter();
   const [loggedIn,setLoggedIn]=useState(false);
   const [user,setUser] = useState('admin');

  return (
    <div>
    <div className='navBar'> 
    <Image
     src='/logo.png'
     alt='logo'
     height={70}
     width={70}
     className='logo'
     onClick={()=>router.push('/')}
    />
   
   <div className='searchBar'>
      <Space direction='vertical'>
      <Search
       className='search'
      placeholder="Search here in hatbazzar"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
      </Space>
    </div>
    <div className='account'>
      {!loggedIn &&
      (
      <>
        <Link href='/login'  className='links'><span>Login</span></Link>
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
                  <RiAccountCircleFill size={35} color='white'/>
                     </Space>
                   </a>
                 </Dropdown>
       
        </div>
      )}
      
      <div className='icon'>
      <FaCartShopping color='white' size={30}/>
      <text>0</text>
     </div>
  
    </div>
   </div>
    <div className='categories'>
    {(user==='admin')&&
      (
        <>
          <span >All products</span>
          <span onClick={()=>router.push('/addProducts')}>Add products</span>
          <span>Remove products</span>
          <span>Delete user</span>
          <span>Orders</span>
        </>
      )}
     {(user==='user')&&
      (
        <>
      <span>All</span>
      <span>Fashion</span>
      <span>Electronics</span>
      <span>Electronic assoceries</span>
      <span>Mobiles and watches</span>
      <span>Groceries and pets</span>
        </>
      )}      

     
    </div>
    </div>  
  )
}

export default Navbar