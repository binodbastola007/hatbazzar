import React from 'react';
import { Tooltip } from 'antd';
import { Rate } from 'antd';
import Image from 'next/image';

const Card = ({details}) => {
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
                    <button className='buyNow'>Buy now</button>
                    <button className='addToCart'>Add to cart</button>
                </div>
            </div>

        </div>
    )
}

export default Card