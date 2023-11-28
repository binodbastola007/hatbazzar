import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductList, updateQuantity } from '../GlobalRedux/Features/cart.slice';
import { Button, Modal } from 'antd';

const ProductQty = ({ item }) => {

  const { productList } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleDelete(item.id);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (itemId) => {
    productList.map((item, index) => {
      if (item.id === itemId) {
        const updatedList = [...productList];
        updatedList.splice(index, 1);
        dispatch(updateProductList(updatedList));
      }
    })
  }
  const handleIncrement = (itemId) =>{
    const newList = [...productList];
    const updatedList = newList.map((item,index)=>{
      if(item.id === itemId){
        const updatedItem = {...item};
        updatedItem.quantity+=1;
        return item = updatedItem ;
      }
      else{
        return item;
      }
    })
    dispatch(updateQuantity(updatedList));
  }

  const handleDecrement = (itemId) =>{
    const newList = [...productList];
    const updatedList = newList.map((item,index)=>{
      if(item.id === itemId && item.quantity>0){
        const updatedItem = {...item};
        updatedItem.quantity-=1;
        return item = updatedItem ;
      }
      else{
        return item;
      }
    })
    dispatch(updateQuantity(updatedList));
  }

  const handleQuantityChange=(itemId,value)=>{
    const newList = [...productList];
    const updatedList = newList.map((item,index)=>{
      if(item.id === itemId){
        const updatedItem = {...item};
        updatedItem.quantity= Number(value);
        return item = updatedItem ;
      }
      else{
        return item;
      }
    })
    dispatch(updateQuantity(updatedList));   
  }

  return (
    <div className='productContainer'>
     <div className='info'>
     <Image  src={item.imageUrl} width={70} height={70} alt='' />
      <div className='productInfo'>
        <span>Product name: {item.productName} </span>
        <span>Product price: {item.price} </span>
        <>
          <button className='deleteBtn' type="primary" onClick={showModal}>
            Delete item
          </button>
          <Modal title="Remove item from cart" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to remove this item from the cart ?</p>
          </Modal>
        </>
      </div>

     </div>

      <div className='quantity'>
        <span>Product quantity</span>
        <div className='qtyBtn'>
          <button onClick={()=>{handleDecrement(item.id)}}>-</button>
          <input value={item.quantity} onChange={(e)=>handleQuantityChange(item.id,e.target.value)}/>
          <button onClick={()=>handleIncrement(item.id)}>+</button>
        </div>
      </div>

    </div>
  )
}

export default ProductQty