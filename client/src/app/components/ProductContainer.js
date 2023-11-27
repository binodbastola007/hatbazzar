import React,{useState} from 'react';
import Image from 'next/image';
import '../styles/cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductList } from '../GlobalRedux/Features/cart.slice';
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

  return (
    <div className='productContainer'>
      <Image src={item.imageUrl} width={70} height={70} alt='' />
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

      <div className='quantity'>
        <span>Product quantity</span>
        <div className='qtyBtn'>
          <button>-</button>
          <input value={item.quantity} />
          <button>+</button>
        </div>
      </div>

    </div>
  )
}

export default ProductQty