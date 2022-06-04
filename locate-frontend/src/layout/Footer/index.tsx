import React from 'react';
import { Button } from '../../components';
import logo from '../../assets/logo&img/logo.png';
import { Link } from 'react-router-dom';

export default function Footer({ links }: TProps) {
  return (
    <footer className='bg-gray-700 text-white pt-8 sm:pt-20 flex flex-col justify-center items-center space-y-3 md:space-x-4 md:flex-row md:space-y-0'>
      <div className='w-full px-2 sm:px-6 lg:px-8 max-w-6xl flex flex-col justify-center itmes-center'>
        <div className='flex flex-col justify-center items-center text-white border-b border-primary pb-10 md:pb-14 space-y-10'>
          <div className='space-y-3 text-center'>
            <h2 className='text-2xl font-bold sm:text-3xl'>
              Want to Register or Find a lost Object?
            </h2>
            <p className='max-w-md sm:max-w-xl text-xs font-light tracking-wider sm:text-sm px-2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
          <div className='flex items-center justify-center space-x-4 w-full max-w-sm px-2'>
            <Button
              classes='max-w-xs text-xs tracking-wide flex-grow p-2 sm:p-3 sm:tracking-wider shadow-2xl'
              placeholder='Find Object'
              primary
              to='found_object'
            />
            <div className='flex-shrink border-t border-primary basis-32 sm:basis-52'></div>
            <Button
              classes='max-w-xs text-xs tracking-wide flex-grow p-2 sm:p-3 sm:tracking-wider shadow-2xl'
              placeholder='Register Object'
              primary
              to='lost_object'
            />
          </div>
        </div>
        <ul className='py-10 sm:py-12 border-b border-primary flex flex-col sm:flex-row space-y-10 sm:space-x-16 sm:space-y-0 px-2 sm:px-0'>
          <li>
            <div>
              <img
                className='h-12 md:h-14 w-auto'
                src={logo}
                alt='Locate logo footer'
              />
            </div>
          </li>
          {links.map((link, index) => (
            <li
              key={index}
              className='flex flex-col space-y-4'>
              <div className='flex flex-col space-y-1'>
                <h3 className=''>{link.title}</h3>
                <div className='w-5 border-t-2 border-primary'></div>
              </div>
              <ul className='list-inside list-disc font-light text-xs sm:text-sm space-y-1'>
                {link.subLinks.map((subLink, index) => (
                  <li
                    key={index}
                    className='text-gray-300'>
                    <Link className='hover:underline' to={subLink.to}>{subLink.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className='py-4 text-xs m-0 px-2 sm:px-0 tracking-wide'>&copy; Copyright 2022 - Locate</p>
      </div>
    </footer>
  );
}

type TProps = {
  links: TLinkGroup[];
};

type TLinkGroup = {
  title: string;
  subLinks: TLink[];
};

type TLink = {
  name: string;
  to: string;
};
