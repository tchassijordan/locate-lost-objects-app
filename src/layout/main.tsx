import React from 'react';
import Navbar from './Navbar/index';
import Footer from './Footer/index';
import { UserAuth } from '../lib/Auth/AuthContext.js';

export default function Main({ children }: Props) {
  const headerNavigation = [
    { name: 'Home', to: '/' }
    // { name: 'Lost Objects', to: '/lost_objects' },
    // { name: 'Find Objects', to: '/found_object' },
    // { name: 'Team', to: '/team' }
  ];

  const footerNavigation = [
    {
      title: 'Quick Links',
      subLinks: [
        { name: 'Home', to: '/' },
        { name: 'Lost Objects', to: '/lost_object' },
        { name: 'Find Objects', to: '/found_object' }
      ]
    },
    {
      title: 'Discover',
      subLinks: [
        { name: 'Privacy Policy', to: '#' },
        { name: 'Terms & Conditions', to: '#' },
        { name: 'Owners', to: '#' }
      ]
    }
  ];
  const { user } = UserAuth();

  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <Navbar
        user={user}
        links={headerNavigation}
      />
      <div className='mt-16 bg-gray-50'>{children}</div>
      <Footer links={footerNavigation} />
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}
