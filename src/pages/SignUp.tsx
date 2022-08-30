import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../assets/logo&img/logo.png';
import logoIcon from '../assets/logo&img/logo2.png';
import { InputField, Button } from '../components/index';
import { LockClosedIcon } from '@heroicons/react/solid';
import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs';
import { UserAuth } from '../lib/Auth/AuthContext.js';

export default function SignUp() {
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      street_address: '',
      region: '',
      city: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
      password: Yup.string().required('Please enter your password')
      //first_name: Yup.string().required("Please enter your first name"),
      //last_name: Yup.string().required("Please enter your last name"),
      //street_address: Yup.string().required("Please enter your address"),
      //region: Yup.string().required("Please enter your region"),
      //city: Yup.string().required("Please enter your city"),
    }),
    onSubmit: async (values) => {
      try {
        await createUser(values.email, values.password);
        navigate('/account');
      } catch (e) {
        console.log(e);
      }
    }
  });

  const btn = {
    placeholder: 'Sign up',
    Icon: LockClosedIcon,
    primary: true
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex w-full items-center justify-center bg-gray-50 p-4 shadow-sm'>
        <img
          className='h-6 w-auto md:h-8'
          src={logoIcon}
          alt='Locate Logo'
        />
      </div>
      <div className='max-w-9xl mt-10 flex justify-center space-x-20 py-20 sm:mt-0'>
        <div className='max-w-md space-y-6'>
          <div>
            <img
              className='h-8 w-auto md:h-10'
              src={logo}
              alt='Locate Logo'
            />
          </div>
          <p className='text-sm text-gray-500'>
            Locate offers you the possibility to find any lost object all for
            free
          </p>
          <ul className='flex list-inside list-disc flex-col space-y-2 pl-6'>
            <li className='flex-shrink text-base font-bold'>
              Have you lost an object?{' '}
              <Link
                to=''
                className='text-base text-primary hover:text-orange-700'>
                Visit the Found object page
              </Link>
            </li>
            <li className='flex-shrink text-base font-bold'>
              <Link
                to=''
                className='text-primary hover:text-orange-700'>
                Explore Lost object page
              </Link>
            </li>
            <li className='flex-shrink text-base font-bold'>
              <Link
                to=''
                className='text-primary hover:text-orange-700'>
                Learn more by visiting our page
              </Link>
            </li>
          </ul>
          <p className='text-sm text-gray-500'>
            By signing up for and signing in the service you accept our:{' '}
          </p>
          <ul className='flex list-inside list-disc flex-col space-y-2 pl-6'>
            <li className='flex-shrink text-base'>
              <Link
                to=''
                className='font-bold text-primary hover:text-orange-700 '>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className='mt-5 md:mt-0'>
          <form
            action='#'
            method='POST'
            onSubmit={formik.handleSubmit}>
            <div className='overflow-hidden shadow-md sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      name='first_name'
                      type='text'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      name='last_name'
                      type='text'
                    />
                  </div>

                  <div className='col-span-6'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      name='email'
                      type='email'
                    />
                  </div>

                  <div className='col-span-6'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name='password'
                      type='password'
                    />
                  </div>

                  <div className='col-span-6'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Photo
                    </label>
                    <div className='mt-1 flex items-center'>
                      <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                      <button
                        type='button'
                        className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                        Change
                      </button>
                    </div>
                  </div>

                  <div className='col-span-6'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.street_address}
                      name='street_address'
                      type='text'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      name='city'
                      type='text'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <InputField
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.region}
                      name='region'
                      type='text'
                    />
                  </div>
                </div>
              </div>
              <div className='col-span-6 bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <Button link={btn} />
              </div>

              <div className='flex flex-col space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='flex items-center'>
                  <div className='flex-grow border-t border-gray-300'></div>{' '}
                  <span className='mx-4 flex-shrink text-sm text-gray-500'>
                    Or continue with
                  </span>{' '}
                  <div className='flex-grow border-t border-gray-300'></div>
                </div>
                <div className='flex w-full flex-col space-y-6 pb-6'>
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
                      onClick={() => {
                        /*Write the appopriate firebase function to sign in */
                      }}
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
          </form>
        </div>
      </div>
    </div>
  );
}
