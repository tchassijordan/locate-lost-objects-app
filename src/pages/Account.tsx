import React from 'react';
import { UserAuth } from '../lib/Auth/AuthContext.js';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
      console.log('You are logged out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mx-auto my-16 max-w-[600px] p-4'>
      <h1 className='py-4 text-2xl font-bold'> Account</h1>
      <p>User Email: {user && user.email}</p>

      <button
        onClick={handleLogout}
        className='my-4 border px-6 py-2'>
        Logout
      </button>
    </div>
  );
}
