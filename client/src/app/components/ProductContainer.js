import React from 'react';
import Image from 'next/image';
import '../styles/cart.css';

const ProductQty = () => {
  return (
    
    <div className='productContainer'>
       <Image src={''} width={70} height={70} alt=''/>
       <div className='productInfo'>
       <span>Product name: Badminton set </span>
       <span>Product price: NPR 1450 </span>
       <button className='deleteBtn'>Delete Item</button>
       </div>
      
       <div className='quantity'>
       <span>Product quantity</span>
       <div className='qtyBtn'>
       <button>-</button>
       <input/>
       <button>+</button>
       </div>
       </div>

    </div>
  )
}

export default ProductQty