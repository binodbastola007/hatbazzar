import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PriceDetails = () => {

  const [total, setTotal] = useState(0);
  const { productList } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const sumPrice = () => {
    let totalPrice = 0;
    productList.map((item) => {
      totalPrice = totalPrice + (item.price*item.quantity);
    })
    setTotal(totalPrice);
  }
  useEffect(()=>{
    sumPrice();
  },[productList]);

  return (
    <div className='priceContainer'>
      <h3>PriceDetails</h3>
      <div className='priceDetails'>
        <span>Total price : {total}</span>
        <span>Quantity: {productList.length} items </span>
        <span>Discount : N/A </span>
        <span> Delivery charge : N/A </span>
        <span>Price payable : {total}</span>
        <button className='payBtn'>Pay with esewa</button>
      </div>
    </div>

  )
}

export default PriceDetails