import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';

export const routes = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);
