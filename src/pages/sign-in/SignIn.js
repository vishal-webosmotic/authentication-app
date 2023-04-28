import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useSignInUserMutation } from '../../services/authApi';
import { setUserInfo } from '../../store/authSlice';
import styles from '../page.module.css';
import { useAuth } from './../../context/AuthContext';

export default function SignIn() {
  const { setAuth } = useAuth();

  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: 'raj1@gmail.com',
      password: 'abcd@1234',
    },
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { errors } = formState;
  const [signupIn, res] = useSignInUserMutation();
  useEffect(() => {
    const func = async () => {
      if (res.isError) {
        setMessage(res.error?.data?.message);
      } else if (res.isSuccess) {
        await dispatch(setUserInfo(res.data.data));
        let token = res?.data?.data?.token;
        setAuth(token);
        setMessage(res.data?.message);
      }
    };
    func();
  }, [
    res.isError,
    res.isSuccess,
    res.error?.data?.message,
    res.data?.message,
    navigate,
    res,
    setAuth,
    dispatch,
  ]);

  function onSubmit(data) {
    signupIn(data);
    setMessage('');
  }
  const registerOptions = {
    name: { required: 'Name is required' },
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In</h1>
        <div className={styles.inputContainer}>
          <label>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            {...register('email', registerOptions.email)}
          />
          <div className={styles.errorMes}>
            {errors?.email && errors.email.message}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label>
            Password <span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="password"
            {...register('password', registerOptions.password)}
          />
          <div className={styles.errorMes}>
            {errors?.password && errors.password.message}
          </div>
        </div>
        <div className={styles.error}>{message}</div>
        <button
          type="submit"
          className={`btn btn-primary mt-2 ${styles.button}`}
        >
          {res.isLoading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Submit
        </button>
        <div className={styles.signUpButton}>
          <Link to={'/signup'}>Become user?</Link>
        </div>
      </form>
    </div>
  );
}
