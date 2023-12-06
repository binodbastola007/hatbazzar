"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Select, Space, Tooltip, Typography } from 'antd';
import { Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import '@/app/styles/cart.css';


const page = () => {

    const [total, setTotal] = useState(0);
    const { productList, orderId } = useSelector(state => state.cart);
    const { category } = useSelector(state => state.navbar);
    const router = useRouter();
    const { Option } = Select;


    const onFinish = async (values) => {
        const shippingDetails = {
            fullName: values.fullname,
            phoneNumber: values.phonenumber,
            province: values.district.province,
            district: values.address.district,
            city: values.city,
            street: values.street
        }
        const res = await fetch(`http://localhost:4000/add-checkout-details/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shippingDetails)
        })
        const data = res.json();

    };
    const sumPrice = () => {
        let totalPrice = 0;
        productList.map((item) => {
            totalPrice = totalPrice + (item.price * item.quantity);
        })
        setTotal(totalPrice);
    }


    const hasPageBeenRendered = useRef(false);
    useEffect(() => {
        if (hasPageBeenRendered.current) {
            router.push('/');
        }
        hasPageBeenRendered.current = true;
    }, [category]);


    useEffect(() => {
        sumPrice();
    }, [])

    return (
        <>
            <Navbar />
            <div className='body'>
                <div className='shippingDetails'>
                    <h3>Enter your shipping details</h3>
                    <div className='shippingContainer'>
                        <Form
                            className='checkoutForm'
                            name="complex-form"
                            size='medium'
                            onFinish={onFinish}
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}

                        >
                            <Form.Item label="Full name">
                                <Space>
                                    <Form.Item
                                        name="fullname"
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: 'name is required',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 300,
                                            }}
                                            placeholder="Enter your fullname here"
                                        />
                                    </Form.Item>
                                    <Tooltip title="Useful information">
                                        <Typography.Link href="#API" style={{ color: '#9ddacc' }}>Need Help?</Typography.Link>
                                    </Tooltip>
                                </Space>
                            </Form.Item>
                            <Form.Item label="Address">
                                <Space.Compact>
                                    <Form.Item
                                        name={['district', 'province']}
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Province is required',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Select province">
                                            <Option value="koshi">Koshi</Option>
                                            <Option value="madhesh">Madhesh</Option>
                                            <Option value="bagmati">Bagmati</Option>
                                            <Option value="gandaki">Gandaki</Option>
                                            <Option value="lumbini">Lumbini</Option>
                                            <Option value="karnali">Karnali</Option>
                                            <Option value="sudurpaschim">Sudurpaschim</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={['address', 'district']}
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: 'District is required',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: '50%',
                                            }}
                                            placeholder="District"
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>
                            <Form.Item
                                label="City"
                                style={{
                                    marginBottom: 0,
                                }}
                            >
                                <Form.Item
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 8px)',
                                    }}
                                >
                                    <Input placeholder="Enter city" />
                                </Form.Item>
                                <Form.Item
                                    name="street"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        display: 'inline-block',
                                        width: 'calc(50% - 8px)',
                                        margin: '0 8px',
                                    }}
                                >
                                    <Input placeholder="Enter street address" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Phone number">
                                <Space>
                                    <Form.Item
                                        name="phonenumber"
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message: 'phone number is required',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: 300,
                                            }}
                                            placeholder="Enter your phone number here"
                                        />
                                    </Form.Item>
                                </Space>
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button className='continueBtn' type='primary' htmlType="submit">
                                    Continue to payment
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className='productInfo'>
                            <div className='priceContainer'>
                                <div>
                                    <h3 style={{ textAlign: 'left' }}>PriceDetails</h3>
                                    <div className='priceDetails'>
                                        <span >Total price : {total}</span>
                                        <span >Quantity: {productList.length} items </span>
                                        <span >Discount : 0 </span>
                                        <span > Delivery charge : 0 </span>
                                        <span >Price payable : {total}</span>
                                        <br />
                                        <span>Order id : {orderId}</span>
                                    </div>
                                    <Divider style={{ backgroundColor: 'black' }} />
                                    <div className='paymentPartners'>
                                        <span>We accept: </span><Image src='/esewa.png' width={100} height={50} alt='' />
                                    </div>

                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </>

    )
}

export default page