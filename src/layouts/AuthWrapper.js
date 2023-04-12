import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { UserContext } from '../context/AuthContext';

// import { Navigate } from 'react-router-dom';

// import { useAuth } from '../context/AuthContext';

const AuthWrapper = ({ isAuth = true, children }) => {
  // const { token } = useAuth();
  // console.log('isAuth', {
  //   isAuth,
  //   token,
  // });
  // console.log(setAuth, token);
  // isAuth = false;
  const userData = useContext(UserContext);
  console.log(userData, isAuth);

  if (userData.token && !isAuth) {
    console.log('line 11', userData);
    return <Navigate to="/" />;
  } else if (!userData.token && isAuth) {
    return <Navigate to="/signin" />;
  }
  return <div>{children}</div>;
};
export default AuthWrapper;
