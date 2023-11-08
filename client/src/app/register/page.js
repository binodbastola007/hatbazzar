'use client';

import React from 'react';
import { Formik, Form, Field , resetForm} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import {  message } from 'antd';
import Footer from '../components/Footer';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string()
    .min(9,'Too Short!')
    .max(11,'Too Long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
  .min(7, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  confirmPassword: Yup.string()
  .min(7, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required')
  .oneOf([Yup.ref("password")], "Passwords does not match")
  
});
const index=()=>{
  const [messageApi, contextHolder] = message.useMessage();
 
 const handleRegister= async(values) => {
  const res = await fetch('http://localhost:4000/register',{
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })
  const data = await res.json();
  messageApi.open({
  type: res.status == 200 ? 'success': 'error',
  content: data.msg,
  });
  if(res.status ==200){
    resetForm();
  }
 }

  return (
    <>
     <Navbar/>
     <div className='body'>
     <div className='registerBox' >
     <h1>Sign Up</h1>
     <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         phoneNumber:'',
         email: '',
         password: '',
         confirmPassword: ''
       }}
       validationSchema={SignupSchema}
       onSubmit={(values,{resetForm}) => {
         handleRegister(values);        
       }}
     >
       {({ errors, touched }) => (
         <Form className='form' >
         {contextHolder}
           <Field  placeholder="Firstname" name="firstName" />
           {errors.firstName && touched.firstName ? (
             <div  className='errors'>{errors.firstName}</div>
           ) : null}
           <Field  placeholder="Lastname" name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div  className='errors'>{errors.lastName}</div>
           ) : null}
           <Field  placeholder="Phone number"  name="phoneNumber" />
           {errors.phoneNumber && touched.phoneNumber ? (
             <div  className='errors'>{errors.phoneNumber}</div>
           ) : null}
           <Field  placeholder="Email"  name="email" type="email" />
           {errors.email && touched.email ? 
           <div  className='errors'>{errors.email}</div> : null}
           
           <Field  placeholder="Password"  name="password" />
           {errors.password && touched.password ? (
             <div  className='errors'>{errors.password}</div>
           ) : null}
           <Field  placeholder="Confirm password"  name="confirmPassword" />
           {errors.confirmPassword && touched.confirmPassword ? (
             <div className='errors'>{errors.confirmPassword}</div>
           ) : null}
     
           <button className='submitBtn' type="submit" >Submit</button>
           <div className='link'>
           Already have an account ? <Link className='linkBtn' href="/login">Sign In</Link>  instead
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