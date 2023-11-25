import React from 'react'

const PriceDetails = () => {
  return (
    <div className='priceContainer'>
      <h3>PriceDetails</h3>
      <div className='priceDetails'>
        <span>Total price : 28700</span>
        <span>Quantity: 3 items</span>
        <span>Discount : -788</span>
        <span> Delivery charge : 500</span>
        <span>Price payable : 25000</span>
        <button className='payBtn'>Pay with esewa</button>
      </div>
    </div>

  )
}

export default PriceDetails