'use client'
import React ,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
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
import {  message } from 'antd';
import { FaS } from 'react-icons/fa6';


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

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading,setLoading]=useState(false);
  
  const onFinish = async(values) => {
    setLoading(true);
    const URL = [];
    for(let i=0;i<values.upload.length;i++){
      const file =  values.upload[i].originFileObj;
      const formData = new FormData();
      formData.append('file',file);
      formData.append("upload_preset",preset_key);
  
      const res = await fetch(url,{
        method:'POST',
        body:formData,
      })
      const data = await res.json();
      URL.push(data.url);
    }
    values.upload = URL;
    const res = await fetch('http://localhost:4000/products/add',{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json();
    messageApi.open({
    type: res.status == 200 ? 'success': 'error',
    content: data.msg,
    });
    form.resetFields();  
    setLoading(false);
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

  return (
    <div>
   <Navbar/>
    <div className='body'>
    <Form
    form={form}
    className='productForm'
    name="validate_other"
    {...formItemLayout}
    onFinish={onFinish}
    initialValues={{
      'input-number': 3,
      'checkbox-group': ['A', 'B'],
      rate: 3.5,
      'color-picker': null,
    }}
    style={{
      backgroundColor:'rgba(0, 0, 0,0.05)'
    }}
  >
     {contextHolder}
   <h3>Add product in hatbazzar</h3>
   <Form.Item
        name="productname"
        label="Product name"
        tooltip="What do you want others to call your product?"
        rules={[
          {
            required: true,
            message: 'Please input product name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
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
        <Option value="fashion">Fashion</Option>
        <Option value="electronics">Electronics</Option>
        <Option value="electronic assoceries">Electronic assoceries</Option>
        <Option value="mobiles and watches">Mobiles and watches</Option>
        <Option value="Groceries and pets">Groceries and pets</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="select-multiple"
      label=" Available Colors"
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
        <Option value="grey">Golden</Option>
      </Select>
    </Form.Item>
    <Form.Item
        name="price"
        label="Product price"
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
      label="Product image"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra=""
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
        label="Product description"
        rules={[
          {
            required: true,
            message: 'Please provide the description of the product',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} placeholder='Please provide the description of the product' />
      </Form.Item>

    <Form.Item
      wrapperCol={{
        span: 12,
        offset: 6,
      }}
    >
      <Space>
        <Button loading={loading} type="primary" htmlType="submit" className='submitBtn'>
          Submit
        </Button>
        <Button onClick={()=>setLoading(false)} htmlType="reset">reset</Button>
      </Space>
    </Form.Item>
  </Form>
    </div>  
    <Footer/>    
    </div>
  )
}

export default page