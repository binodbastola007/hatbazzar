import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { Rate } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch ,useSelector } from "react-redux";
import { changeProductList } from "../GlobalRedux/Features/cart.slice.js";

const Card = ({ details }) => {

    const router = useRouter();
    const dispatch = useDispatch();

    const handlePurchase = (details) => {
        const productInfo = {
            productName: details.productName,
            price: details.price,
            imageUrl: details.imageUrl[0],
            quantity: 1
        }
      dispatch(changeProductList(productInfo));
      router.push('/cart');
    }

    const handleCardClick = (id) => {
        router.push(`description/${id}`)
    }
    return (
        <div className='card'>
            <Tooltip mouseEnterDelay={1} title="Click on the image to view product details">
                <div className='cardPic' onClick={() => { handleCardClick(details._id) }}>
                    <Image
                        src={`${details.imageUrl[0]}`}
                        alt='product_card'
                        height={200}
                        width={200}
                        priority
                    />
                </div>
            </Tooltip>
            <div className='cardDescription'>
                <span className='cardTitle'>{details.productName}</span>
                <span>Price: {details.currency + ' ' + details.price}</span>
                <span>Ratings:<Rate disabled value={details.rating} /></span>
                <div className='cardBtn'>
                    <button onClick={() => handlePurchase(details)} className='buyNow'>Buy now</button>
                    <button className='addToCart'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card