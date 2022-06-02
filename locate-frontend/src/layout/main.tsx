import React from 'react';
import Navbar from './Navbar/index';
import Footer from './Footer/index';
import { UserAuth } from '../utils/AuthContext';

export default function Main() {
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false }
  ];
  const { user } = UserAuth();

  return (
    <div className='flex flex-col justify-between'>
      <Navbar
        user={user}
        links={navigation}
      />
      <div>This is the main area</div>
      <Footer />
    </div>
  );
}
