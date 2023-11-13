'use client';

import React from 'react';
import { Formik, Form, Field , resetForm} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {  message } from 'antd';
import '../styles/login.css';

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9,'Too Short!')
    .max(11,'Too Long')
    .required('Required'),
  password: Yup.string()
  .min(7, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required')
  
});
const index=()=>{
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async(values) => {
    const res = await fetch('http://localhost:4000/login', {
        method:'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
        messageApi.open({
          type: res.status == 200 ? 'success': 'error',
          content: data.msg,
        });
      console.log(res)
    }

  return (
    <>
    <Navbar/>
    <div className='body'> 
    <div className='loginBox' >
    {contextHolder}
     <h1>login</h1>
     <Formik
       initialValues={{
         phoneNumber:'',
         password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={(values,{resetForm}) => {
         handleLogin(values);
         resetForm();
         
       }}
     >
       {({ errors, touched }) => (
         <Form className='form' >
           <Field  placeholder="Phone number"  name="phoneNumber" />
           {errors.phoneNumber && touched.phoneNumber ? (
             <div  className='errors'>{errors.phoneNumber}</div>
           ) : null}
           
           <Field  placeholder="Password"  name="password" />
           {errors.password && touched.password ? (
             <div  className='errors'>{errors.password}</div>
           ) : null}
           <button className='submitBtn' type="submit" >Submit</button>

         <div className='link'>
         Don't have an account ? <Link className='linkBtn' href='/register'>Sign up</Link> instead
         </div>
         </Form>
       )}
     </Formik>
   </div>
    </div>
    <Footer/>
    </>
  );
}
export default index;