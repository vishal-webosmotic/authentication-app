// import React, { useContext, useEffect } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// import { UserContext } from '../context/AuthContext';
// import { useGetUserMutation } from '../services/authApi';
// // import { setUserInfo } from '../store/authSlice';

// const AuthWrapper = ({ isAuth = true, children }) => {
//   const { userInfo } = useSelector((state) => state.auth);
//   // console.log(userInfo);
//   const userData = useContext(UserContext);
//   const [func, res] = useGetUserMutation();

//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   if (Object.keys(userInfo).length === 0 && userData.token) {
//   //     func();
//   //   }
//   // }, [dispatch, func, res, res.data, res.isSuccess, userData.token, userInfo]);

//   useEffect(() => {
//     func();
//   }, [func]);
//   console.log(res);
//   // useEffect(() => {
//   //   if (res.isSuccess) {
//   //     dispatch(setUserInfo(res.data));
//   //   }
//   // }, [dispatch, res.data, res.isSuccess]);

//   if (userData.token && !isAuth) {
//     return <Navigate to="/" />;
//   } else if (!userData.token && isAuth) {
//     return <Navigate to="/signin" />;
//   }
//   return children;
// };
// export default AuthWrapper;
