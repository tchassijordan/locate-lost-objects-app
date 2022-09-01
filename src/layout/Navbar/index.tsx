import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../lib/Auth/AuthContext.js';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import ManPNG from '../../assets/man.png';
import logo from '../../assets/logo&img/logo.png';
import cn from 'classnames';
import { TProps } from './types';
import { Button } from '../../components';

export default function Navbar({ links, user }: TProps) {
  const { signOut } = UserAuth();

  return (
    <Disclosure
      as='nav'
      className='fixed z-20 w-screen bg-slate-300 sm:absolute'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-6xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between py-2'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
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
              <div className='flex flex-1 items-center justify-center sm:items-center sm:justify-start'>
                <div className='flex flex-shrink-0 items-baseline'>
                  <img
                    className='block h-8 w-auto lg:h-8'
                    src={logo}
                    alt='Locate logo'
                  />
                </div>
                <nav className='hidden sm:ml-6 sm:block lg:ml-12'>
                  <ul className='flex w-full list-none justify-between space-x-8'>
                    {links.map((link, index) => (
                      <li
                        key={index}
                        className='group'>
                        <Link
                          to={link.to}
                          className='border-b border-transparent text-gray-700 transition-all group-hover:cursor-pointer group-hover:border-primary group-hover:pb-[1px] group-hover:text-primary'>
                          {link.name}
                        </Link>
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
                    className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex max-h-[40px] max-w-[40px] rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-full rounded-full lg:h-8'
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
                      <Menu.Items className='group absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:cursor-pointer'>
                        <Menu.Item>
                          <p
                            className={
                              'px-4 py-2 text-sm text-gray-700 group-hover:cursor-pointer sm:text-xs lg:text-sm'
                            }>
                            {`${user?.first_name} ${user?.last_name}`}
                          </p>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              className={cn(
                                active ? 'cursor-pointer underline' : '',
                                'px-4 py-2 text-sm text-gray-700 sm:text-xs lg:text-sm'
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
                  <div className='flex w-48 justify-end space-x-4'>
                    <Button
                      link={{
                        placeholder: 'Sign in',
                        classes: 'text-gray-700 max-w-fit',
                        secondary: true,
                        to: 'sign_in'
                      }}
                    />
                    <Button
                      link={{
                        placeholder: 'Sign up',
                        classes: 'hidden sm:block max-w-fit',
                        primary: true,
                        to: 'sign_up'
                      }}
                    />
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
              <nav className='fixed h-[calc(100vh_-_theme(height.20))] w-full bg-slate-300 px-2 pt-3 pb-3 sm:hidden'>
                <ul className='flex list-none flex-col items-center justify-center space-y-5'>
                  {links.map((link, index) => (
                    <li
                      key={index}
                      className='group'>
                      <Link
                        to={link.to}
                        className='text-gray-700 group-hover:cursor-pointer group-hover:border-b group-hover:border-primary group-hover:pb-1 group-hover:text-primary'>
                        {link.name}
                      </Link>
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
