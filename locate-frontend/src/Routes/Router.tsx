import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
//import Profile from '../pages/Profile';
import Account from '../pages/Account';
import ProtectedRoute from './ProtectedRoute';
import PostObject from '../pages/PostObject';
import Home from '../pages/Home/index';

const Router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route
          index
          element={<Home />}
        />
        
        <Route
          path='sign_in'
          element={<SignIn />}
        />

        <Route
          path='sign_up'
          element={<SignUp />}
        />
        
        {/* Account is suppose to be a dynamic route so modify it */}
        <Route
          path='account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path='profile/:id'
          element={<Profile />}
        /> */}

        <Route
          path='post_object/:id'
          element={<PostObject />}
        />

        <Route
          path='dashboard'
          element={<AdminDashboard />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
