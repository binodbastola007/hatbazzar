'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { EditOutlined } from '@ant-design/icons';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useRouter, useParams } from 'next/navigation';
import { Modal } from 'antd';
import '../../../styles/editProduct.css';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import {
   Button,
   Checkbox,
   Col,
   ColorPicker,
   Form,
   InputNumber,
   Input,
   Radio,
   Rate,
   Row,
   Select,
   Slider,
   Space,
   Switch,
   Upload,
} from 'antd';
import { message } from 'antd';
import { FaS } from 'react-icons/fa6';
import index from '@/app/page';

const url = 'https://api.cloudinary.com/v1_1/dwnuwdsdb/image/upload';
const preset_key = 'ml_default';

const { Option } = Select;
const formItemLayout = {
   labelCol: {
      span: 6,
   },
   wrapperCol: {
      span: 14,
   },
};



const normFile = (e) => {
   console.log('Upload event:', e);
   if (Array.isArray(e)) {
      return e;
   }
   return e?.fileList;
};


const page = () => {

   const router = useRouter();
   const params = useParams();
   const [data, setData] = useState({});
   const [images, setImages] = useState([]);
   const [path, setPath] = useState('');
   const [colors, setColors] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isModal2Open, setIsModal2Open] = useState(false);

   const showModal = () => {
      setIsModalOpen(true);
   };
   const showModal2 = () => {
      setIsModal2Open(true);
   }
   const handleOk = () => {
      setIsModalOpen(false);
      setIsModal2Open(false);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
      setIsModal2Open(false);
   };

   const [messageApi, contextHolder] = message.useMessage();
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);

   const onFinish = async (values) => {
      setLoading(true);
      const URL = [...images];
      for (let i = 0; i < values.upload.length; i++) {
         const file = values.upload[i].originFileObj;
         const formData = new FormData();
         formData.append('file', file);
         formData.append("upload_preset", preset_key);

         const res = await fetch(url, {
            method: 'POST',
            body: formData,
         })
         const data = await res.json();
         URL.push(data.url);
      }
      values.upload = URL;
      const res = await fetch(`http://localhost:4000/product/edit/${params.id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(values)
      })
      const data = await res.json();
      messageApi.open({
         type: res.status == 200 ? 'success' : 'error',
         content: data.msg,
      });
      setLoading(false);
      setIsModalOpen(false);
      fetchProduct(params.id);
   };

   const suffixSelector = (
      <Form.Item
         rules={[
            {
               required: true,
               message: 'Please choose the currency from right ',
            },
         ]}
         name="suffix" noStyle>
         <Select
            style={{
               width: 70,
            }}
         >
            <Option value="NPR" >रु॰</Option>
            <Option value="INR" >₹</Option>
            <Option value="USD" >$</Option>

         </Select>
      </Form.Item>
   );

   const handleDelete = async (item, index) => {
      images.splice(index, 1);
      const res = await fetch(`http://localhost:4000/product/deleteimg/${params.id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ images })
      })
      const data = await res.json();
      console.log(data);
      messageApi.open({
         type: res.status == 200 ? 'success' : 'error',
         content: data.msg,
      });
      handleCancel();



   }


   const fetchProduct = async (id) => {
      try {
         const res = await fetch(`http://localhost:4000/product/${id}`);
         const result = await res.json();
         if (result.data) {
            setData(result.data);
            setImages(result.data.imageUrl);
            setColors(result.data.colors)
         }
         else {
            messageApi.open({
               type: 'error',
               content: result.msg,
            });
         }
      }
      catch (err) {
         console.log(err);
      }
   }



   useEffect(() => {
      fetchProduct(params.id);
   }, [])

   return (
      <>
         <Navbar />
         <div className='body'>
            <div className='container'>
               <div className='settings'>
                  <h3 className='title'>Update your product details</h3>
                  <div className='editBoxes' onClick={showModal}>Edit your product name <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal}>Add product image <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal2}>Delete product image <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal}>Change product category <EditOutlined /> </div>
                  <div className='editBoxes' onClick={showModal}>Edit product colors <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal}>Edit product price <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal}>Change product rating <EditOutlined /></div>
                  <div className='editBoxes' onClick={showModal}>Edit product description <EditOutlined /></div>
                  <Modal title="Update your product details"
                     centered
                     open={isModalOpen}
                     onOk={handleOk} onCancel={handleCancel}
                     footer={null}>
                     <Form
                        form={form}
                        className='productForm'
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                           'productname': data.productName,
                           'select': data.category,
                           'select-multiple': [...colors],
                           'price': data.price,
                           'suffix': data.currency,
                           'rate': data.rating,
                           'upload': [],
                           'intro': data.description
                        }}
                        style={{
                           backgroundColor: 'rgba(0, 0, 0,0.05)',
                           padding: '10px'
                        }}
                     >
                        {contextHolder}
                        <Form.Item
                           name="productname"
                           label="Name"
                           tooltip="What do you want others to call your product?"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input product name!',
                                 whitespace: true,
                              },
                           ]}
                        >
                           <Input showCount maxLength={25} />
                        </Form.Item>

                        <Form.Item
                           name="select"
                           label="Category"
                           hasFeedback
                           rules={[
                              {
                                 required: true,
                                 message: 'Please select category of the product!',
                              },
                           ]}
                        >
                           <Select placeholder="Please select category of the product">
                              <Option value="fashion and beauty">Fashion and beauty</Option>
                              <Option value="electronics">Electronics</Option>
                              <Option value="laptops">Laptops</Option>
                              <Option value="electronic assoceries">Electronic assoceries</Option>
                              <Option value="mobiles and watches">Mobiles and watches</Option>
                              <Option value="groceries and pets">Groceries and pets</Option>
                              <Option value="games and sports">Games and sports</Option>
                              <Option value="musical instruments">Musical instruments</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item
                           name="select-multiple"
                           label="Colors"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please select colors of your product!',
                                 type: 'array',
                              },
                           ]}
                        >
                           <Select mode="multiple" placeholder="Please select available colors of your product">
                              <Option value="red">Red</Option>
                              <Option value="green">Green</Option>
                              <Option value="blue">Blue</Option>
                              <Option value="black">Black</Option>
                              <Option value="white">White</Option>
                              <Option value="yellow">Yellow</Option>
                              <Option value="orange">Orange</Option>
                              <Option value="purple">Purple</Option>
                              <Option value="grey">Grey</Option>
                              <Option value="golden">Golden</Option>
                           </Select>
                        </Form.Item>
                        <Form.Item
                           name="price"
                           label="Price"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please input product price!',
                              },
                           ]}
                        >
                           <InputNumber
                              addonAfter={suffixSelector}
                              placeholder='Please input product price'
                              style={{
                                 width: '100%',
                              }}
                           />
                        </Form.Item>


                        <Form.Item
                           name="upload"
                           label="Image"
                           valuePropName="fileList"
                           getValueFromEvent={normFile}
                           rules={[
                              {
                                 required: false,
                                 message: 'Please upload the image of your product!',
                              },
                           ]}
                        >
                           <Upload name="logo" action='/upload.do' listType="picture">
                              <Button icon={<UploadOutlined />} >Click to upload</Button>
                           </Upload>
                        </Form.Item>

                        <Form.Item name="rate" label="Ratings">
                           <Rate />
                        </Form.Item>

                        <Form.Item
                           name="intro"
                           label="Description"
                           rules={[
                              {
                                 required: true,
                                 message: 'Please provide the description of the product',
                              },
                           ]}
                        >
                           <Input.TextArea showCount maxLength={1000} placeholder='Please provide the description of the product' />
                        </Form.Item>

                        <Form.Item
                           wrapperCol={{
                              span: 12,
                              offset: 6,
                           }}
                        >
                           <Space>
                              <Button loading={loading} type="primary" htmlType="submit" className='submitBtn'>
                                 Save changes
                              </Button>
                           </Space>
                        </Form.Item>
                     </Form>
                  </Modal>
                  <Modal title="Delete product image/s"
                     centered
                     open={isModal2Open}
                     onOk={handleOk} onCancel={handleCancel}
                     footer={null}>
                     <div className='deleteImageArr'>
                        {images.map((item, index) => {
                           return (<div className='imageContainer'><Image
                              src={item}
                              alt=''
                              height={140}
                              width={140}
                              className='image'
                           />
                              <Popconfirm
                                 title="Delete the image"
                                 description="Are you sure to delete this image?"
                                 okText="Yes"
                                 cancelText="No"
                                 onConfirm={() => handleDelete(item, index)}
                              >
                                 <RiDeleteBin7Fill size={20} color='#c90808' className='imageDeleteBtn' />
                              </Popconfirm>
                           </div>)
                        })}
                     </div>
                  </Modal>
               </div>
               <div className='productDetails'>
                  <div className='details'>
                     <div className='imagesArray'>
                        {images.map((item, index) => {
                           return (
                              <>
                                 <Image key={index} onClick={() => setPath(item)} src={item} alt='' height={70} width={70} className='img' /> &nbsp;
                              </>
                           )
                        })}
                     </div>
                     <div className='productImg'>
                        <Image
                           src={path ? path : images[0]}
                           alt='product_img'
                           width={250}
                           height={250}

                           priority
                           style={{ border: 'none' }}
                        />
                     </div>
                     <div className='productDetails'>
                        <span className='name'>Product name: {data.productName}</span>
                        <span className='category'>Category: {data.category}</span>
                        <span className='colors'>
                           Available colors:&nbsp;
                           {(colors.length > 0) &&
                              (colors.map((item, index) => {
                                 if (index === colors.length - 1) {
                                    return item;
                                 }
                                 return item + ',' + ' ';
                              })
                              )
                           }
                        </span>
                        <span className='price'>Price: {data.currency} {data.price}</span>
                        <Rate disabled value={data.rating} />

                        <div className='productButtons'>
                           <button className='buyProduct'>Buy now</button>
                           <button className='addIntoCart'>Add to cart</button>
                        </div>

                        <div className='descriptionBox'>
                           <h5>Product Details</h5>
                           <div className='description'>
                              <span>{data.description}</span>
                           </div>
                           <div className='rating'>
                              <span>({data.rating}/5) </span>
                              <Rate disabled value={data.rating} />
                           </div>
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