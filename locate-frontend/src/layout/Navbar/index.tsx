import React, { Fragment } from 'react';
import { UserAuth } from '../../utils/AuthContext';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import ManPNG from '../../assets/man.png';
import logo from '../../assets/logo&img/logo.png';
import cn from 'classnames';
import { TProps } from './types';
import { Button } from '../../components';

export default function Navbar({ links, user }: TProps) {
  const { signOut } = UserAuth();

  const signInBtnProps = {
    placeholder: 'Sign in',
    classes: 'text-gray-700 max-w-fit',
    secondary: true,
    to: 'sign_in'
  };

  const signUpBtnProps = {
    placeholder: 'Sign up',
    classes: 'hidden sm:block max-w-fit',
    primary: true,
    to: 'sign_up'
  };

  return (
    <Disclosure
      as='nav'
      className='bg-slate-300 fixed sm:absolute w-screen z-20'>
      {({ open }) => (
        <>
          <div className='max-w-6xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16 py-2'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  ) : (
                    <MenuIcon
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-center sm:justify-start'>
                <div className='flex-shrink-0 flex items-baseline'>
                  <img
                    className='block h-8 w-auto lg:h-8'
                    src={logo}
                    alt='Delphos-IQ logo'
                  />
                </div>
                <nav className='hidden sm:block sm:ml-6 lg:ml-12'>
                  <ul className='list-none flex justify-between w-full space-x-8'>
                    {links.map((link, index) => (
                      <li
                        key={index}
                        className='group'>
                        <div className='text-gray-700 group-hover:cursor-pointer group-hover:text-primary border-b border-transparent group-hover:pb-[1px] group-hover:border-primary transition-all'>
                          {link.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                {user !== null ? (
                  <Menu
                    as='div'
                    className='ml-3 relative'>
                    <div>
                      <Menu.Button className='bg-primary max-w-[40px] max-h-[40px] flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 lg:h-8 w-full rounded-full'
                          src={ManPNG}
                          alt='profile'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none group group-hover:cursor-pointer'>
                        <Menu.Item>
                          <p
                            className={
                              'text-sm sm:text-xs lg:text-sm px-4 py-2 text-gray-700 group-hover:cursor-pointer'
                            }>
                            {`${user?.first_name} ${user?.last_name}`}
                          </p>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              className={cn(
                                active ? 'underline cursor-pointer' : '',
                                'px-4 py-2 text-sm sm:text-xs lg:text-sm text-gray-700'
                              )}
                              role='button'
                              onClick={signOut}>
                              Logout
                            </p>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className='space-x-4 flex w-48 justify-end'>
                    <Button link={signInBtnProps} />
                    <Button link={signUpBtnProps} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile navigation dropdown */}
          <Transition.Child
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Disclosure.Panel className='sm:hidden'>
              <nav className='sm:hidden px-2 pt-3 pb-3 h-[calc(100vh_-_theme(height.20))] w-full fixed bg-slate-300'>
                <ul className='list-none flex flex-col justify-center items-center space-y-5'>
                  {links.map((link, index) => (
                    <li
                      key={index}
                      className='group'>
                      <span className='text-gray-700 group-hover:cursor-pointer group-hover:text-primary group-hover:border-b group-hover:pb-1 group-hover:border-primary'>
                        {link.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </nav>
            </Disclosure.Panel>
          </Transition.Child>
        </>
      )}
    </Disclosure>
  );
}
