import React, { useContext, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../context/AuthContext';
import { useGetUserMutation } from '../services/authApi';
import { setUserInfo } from '../store/authSlice';

const AuthWrapper = ({ isAuth = true, children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userData = useContext(UserContext);
  const [func, data] = useGetUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo?.success && userData?.token && isAuth) {
      func();
    }
  }, [userInfo?.success, func, userData?.token, isAuth]);

  useEffect(() => {
    if (data.isSuccess && data.data) {
      dispatch(setUserInfo(data.data));
    }
  }, [dispatch, data?.isSuccess, data?.data]);

  if (userData.token && !isAuth) {
    return <Navigate to="/" />;
  } else if (!userData.token && isAuth) {
    return <Navigate to="/signin" />;
  }
  return children;
};
export default AuthWrapper;
