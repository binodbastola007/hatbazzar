import React from 'react';
import Image from 'next/image';
import '../styles/cart.css';

const ProductQty = ({item}) => {
  return (
    <div className='productContainer'>
       <Image src={item.imageUrl} width={70} height={70} alt=''/>
       <div className='productInfo'>
       <span>Product name: {item.productName} </span>
       <span>Product price: {item.price} </span>
       <button className='deleteBtn'>Delete Item</button>
       </div>
      
       <div className='quantity'>
       <span>Product quantity</span>
       <div className='qtyBtn'>
       <button>-</button>
       <input value={item.quantity}/>
       <button>+</button>
       </div>
       </div>

    </div>
  )
}

export default ProductQty