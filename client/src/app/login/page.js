'use client';

import React from 'react';
import { Formik, Form, Field , resetForm} from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <>
    <div className='container'> 
    <div className='registerBox' >
     <h1>login</h1>
     <Formik
       initialValues={{
         phoneNumber:'',
         password: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={(values,{resetForm}) => {
         handleRegister(values);
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
  
    </>
  );
}
export default index;