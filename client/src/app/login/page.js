'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, resetForm } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { message } from 'antd';
import '../styles/login.css';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, useSession } from 'next-auth/react';
import userSlice, { setToken , setLoginDetails} from '../GlobalRedux/Features/user.slice';


const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9, 'Too Short!')
    .max(11, 'Too Long')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')

});
const index = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const { category } = useSelector(state => state.navbar);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();


  // const handleSignIn = async () => {
  //   const res = await fetch('http://localhost:4000/login-googleuser', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(session.data.user)
  //   })
  //   const data = await res.json();
  //   console.log(data)
  //   setUserName(data?.userDetails.name)
  //   setUserImage(data?.userDetails.image);
  //   router.push('/');
  // }

  // if (session.status === 'authenticated') {
  //   // handleSignIn();
  //   messageApi.open({
  //     type: 'success',
  //     content: "Login success",
  //   });
  // }
  // if (session.status === 'unauthenticated') {
  //   messageApi.open({
  //     type: 'error',
  //     content: "Couldnot login , please try again later !",
  //   });
  // }



  const handleLogin = async (values) => {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });
    if(data.token!==''){
      dispatch(setToken(data.token));
      dispatch(setLoginDetails(data.loginDetails));
      router.push('/');
    }

  }

  const hasPageBeenRendered = useRef(false);
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      router.push('/');
    }
    hasPageBeenRendered.current = true;
  }, [category]);

  return (
    <>
      <Navbar />
      <div className='body'>
        <div className='loginBox' >
          {contextHolder}
          <h1>login</h1>
          <Formik
            initialValues={{
              phoneNumber: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();

            }}
          >
            {({ errors, touched }) => (
              <Form className='form' >
                <Field placeholder="Phone number" name="phoneNumber" />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className='errors'>{errors.phoneNumber}</div>
                ) : null}

                <Field placeholder="Password" name="password" />
                {errors.password && touched.password ? (
                  <div className='errors'>{errors.password}</div>
                ) : null}
                <button className='submitBtn' type="submit" >Submit</button>

                <div className='link'>
                  Don't have an account ? <Link className='linkBtn' href='/register'>Sign up</Link> instead
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div >
          <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>OR</div>
          <button className='googleBtn' onClick={() => { signIn('google') }}>
            <Image src='/google_logo.png' width={30} height={30} />
            <span>Sign in with google</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default index;