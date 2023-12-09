"use client";
import React from 'react';
import { Carousel } from 'antd';


const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Advertisement = () => {
  return (
    <>
    <Carousel  autoplay>
    <div>
       <img className='carouselImage' src='/1.jpg' style={contentStyle}/>
    </div>
    <div>
    <img className='carouselImage' src='/2.jpg' style={contentStyle}/>
    </div>
    <div>
    <img className='carouselImage' src='/3.png' style={contentStyle}/>
    </div>
    <div>
    <img className='carouselImage' src='/4.png' style={contentStyle}/>
    </div>
  </Carousel>
    </>
  )
}

export default Advertisement;