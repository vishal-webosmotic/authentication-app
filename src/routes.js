import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AuthWrapper from './layouts/AuthWrapper';
import Chat from './pages/chat/Chat';
import HomePage from './pages/HomePage';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';

export const routes = createBrowserRouter([
  {
    path: '/signin',
    element: (
      <AuthWrapper isAuth={false}>
        <SignIn />
      </AuthWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthWrapper isAuth={false}>
        <SignUp />
      </AuthWrapper>
    ),
  },
  {
    path: '/',
    element: (
      <AuthWrapper>
        <HomePage />
      </AuthWrapper>
    ),
    // children: [
    //   {
    //     path: 'chat',
    //     element: (
    //       <AuthWrapper>
    //         <Chat />
    //       </AuthWrapper>
    //     ),
    //   },
    // ],
  },
  {
    path: '/chat',
    element: (
      <AuthWrapper>
        <Chat />
      </AuthWrapper>
    ),
  },
]);
