import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Formik, Form, Field , resetForm} from 'formik';
import * as Yup from 'yup';

const Navbar = () => {
  return (
    <div className='navBar'> 
    <Image
     src='/logo.png'
     alt='logo'
     height={90}
     width={90}
     className='logo'
    />
   <div>
    <Formik
      initialValues={{
        phoneNumber:'',
        password: '',
      }}
      onSubmit={(values,{resetForm}) => {
        resetForm();
        
      }}
    >
      {({ errors, touched }) => (
        <Form className='miniForm'>
          <Field  placeholder="Phone number"  name="phoneNumber" />

          <Field  placeholder="Password"  name="password" />
          
          <button className='navSubmitBtn' type="submit" >Submit</button>
        </Form>
      )}
    </Formik>
    <div className='miniLinkBox'>
        Don't have an account ? <Link className='linkBtn' href='/register'>Sign up</Link> instead
     </div>
  </div>
   </div>
  )
}

export default Navbar