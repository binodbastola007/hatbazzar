import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { Rate } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { buyNow, addToCart } from "../GlobalRedux/Features/cart.slice.js";
import { TiTick } from "react-icons/ti";
import { message } from 'antd';

const Card = ({ details }) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { productList } = useSelector(state => state.cart);
    const [addStatus, setAddStatus] = useState(false);

    const handlePurchase = async(details) => {

          var newData = true;

          await productList.map((items)=>{
            if(items.id === details._id){
                router.push('/cart');
                newData = false;
            }
           })

          if(newData){
          
            const productInfo = {
                id: details._id,
                productName: details.productName,
                price: details.price,
                imageUrl: details.imageUrl[0],
                quantity: 1,

            }
            dispatch(buyNow(productInfo));
            setAddStatus(true);
            router.push('/cart');
       }

        }

    const handleCart = async(details) => {

        var newData = true;
    
        await productList.map((items)=>{
            if(items.id === details._id){
                newData = false;
                messageApi.open({
                    type: 'error',
                    content: "Item already exist in the cart",
                 })
            }
           })

       if(newData){
        const productInfo = {
            id: details._id,
            productName: details.productName,
            price: details.price,
            imageUrl: details.imageUrl[0],
            quantity: 1,

        }
        dispatch(addToCart(productInfo));
        setAddStatus(true);
       }


    }

    const handleCardClick = (id) => {
        router.push(`description/${id}`)
    }

    return (
        <div className='card'>
            {contextHolder}
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
                    <button onClick={() => handleCart(details)} disabled={addStatus} className={addStatus ? 'addedToCart' : 'addToCart'}>{addStatus ? 'Added !' : 'Add to cart'}</button>
                </div>
            </div>
        </div>
    )
}

export default Card