import React from 'react';

// import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateUser from '../pages/User/create';



const RoutesPage: React.FC = () => {
  return (

    <Routes>
      <Route path='/login' caseSensitive={false} element={<SignIn />} />
      <Route path='/registrar' caseSensitive={false} element={<SignUp />} />
      <Route path='/' caseSensitive={false} element={<Home />} />


      {/* <Route path='/dashboard' caseSensitive={false} element={<Dashboard />} /> */}

      <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
      <Route path="/create-user" element={<PrivateRoute> <CreateUser /> </PrivateRoute>} />

    </Routes>
  );
}

export default RoutesPage;
