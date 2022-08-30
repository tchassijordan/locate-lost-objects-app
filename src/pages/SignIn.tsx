import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from '../assets/logo&img/logo.png';
import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs';
import { InputField, Button } from '../components/index';
import { UserAuth } from '../lib/Auth/AuthContext.js';

export default function SignIn() {
  const { signIn, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
      password: Yup.string().required('Please enter your password')
    }),
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn().then(navigate('/'));
    } catch (e) {}
  };

  const btn = {
    placeholder: 'Sign up',
    Icon: LockClosedIcon,
    primary: true
  };

  return (
    <>
      <div className='relative flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:space-x-10 lg:px-8'>
        <div className='max-w-md space-y-4'>
          <div>
            <div>
              <img
                className='mx-auto h-12 w-auto md:h-14'
                src={logo}
                alt='Locate Logo'
              />
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600'>
              Or{' '}
              <Link
                className='font-medium text-primary hover:text-orange-500'
                to='/sign_up'>
                create a new account
              </Link>
            </p>
          </div>

          <div className='w-full space-y-8 rounded-md bg-white px-8 py-6 shadow-lg'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={formik.handleSubmit}>
              <input
                type='hidden'
                name='remember'
                defaultValue='true'
              />
              <div className='space-y-6'>
                <div>
                  <InputField
                    name='email'
                    type='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <div className='text-xs tracking-wide text-red-600'>
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <InputField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name='password'
                    type='password'
                  />
                  <div className='text-xs tracking-wide text-red-600'>
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-10'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-orange-500'
                  />
                  <label
                    htmlFor='remember-me'
                    className='ml-2 block text-sm text-gray-900'>
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <Link
                    to='#'
                    className='font-medium text-primary hover:text-orange-500'>
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>{<Button link={btn} />}</div>
            </form>

            {/* Social Platforms section */}
            <div className='flex flex-col space-y-6'>
              <div className='flex items-center'>
                <div className='flex-grow border-t border-gray-300'></div>{' '}
                <span className='mx-4 flex-shrink text-sm text-gray-500'>
                  Or continue with
                </span>{' '}
                <div className='flex-grow border-t border-gray-300'></div>
              </div>
              <div className='flex w-full space-x-3 pb-6'>
                <button className='flex flex-grow cursor-not-allowed items-center justify-center rounded-md border border-gray-300 px-4 py-2'>
                  <BsFacebook
                    className='text-gray-600'
                    onClick={() => {
                      /*Write the appopriate firebase function to sign in */
                    }}
                  />
                </button>
                <button className='flex flex-grow items-center justify-center rounded-md border border-gray-300 px-4 py-2'>
                  <BsGoogle
                    className='text-gray-600'
                    onClick={handleGoogleSignIn}
                  />
                </button>
                <button className='flex flex-grow cursor-not-allowed items-center justify-center rounded-md border border-gray-300 px-4 py-2'>
                  <BsTwitter
                    className='text-gray-600'
                    onClick={() => {
                      /*Write the appopriate firebase function to sign in */
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
