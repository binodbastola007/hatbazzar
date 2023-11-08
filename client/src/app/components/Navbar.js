import React ,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import {RiAccountCircleFill} from 'react-icons/ri';
import { useRouter } from 'next/navigation';
 
const Navbar = () => {
   const router = useRouter();
   const [loggedIn,setLoggedIn]=useState(false);

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
      <input type='text' placeholder='Search here in hatbazzar'/>
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
        <div className='icon'>
          <RiAccountCircleFill/>
          <span>Your account</span>
        </div>
      )}
      
      <div className='icon'>
      <FaCartShopping color='white' size={30}/>
      <text>0</text>
     </div>
  
    </div>
   </div>
    <div className='categories'>
      <span>All</span>
      <span>Clothing </span>
      <span>Electronics</span>
      <span>Electronic assoceries</span>
      <span>Mobiles and watches</span>
      <span>Groceries</span>
    </div>
    </div>  
  )
}

export default Navbar