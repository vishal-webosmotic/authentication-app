import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSignInUserMutation } from '../../services/authApi';
import '../sign-up/SignUp.module.css';

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: 'raj@gmail.com',
      password: 'abcd@1234',
    },
  });
  const navigate = useNavigate();
  const [userError, setUserError] = useState('');
  const { errors, isSubmitting } = formState;
  const [signupIn, res] = useSignInUserMutation();
  useEffect(() => {
    if (res.isError) {
      setUserError(res.error?.data?.message);
    } else if (res.isSuccess) {
      navigate('/home');
      setUserError(res.data?.message);
    }
  }, [res.isError, res.isSuccess, res.error?.data?.message, res.data?.message]);

  function onSubmit(data) {
    signupIn(data);
    setUserError('');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
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
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In Form</h1>
        <div className="inputContainer">
          <label>Email</label>
          <input
            type="email"
            name="email"
            {...register('email', registerOptions.email)}
          />
          <p className="errorMes">{errors?.email && errors.email.message}</p>
        </div>
        <div className="inputContainer">
          <label>Password</label>
          <input
            type="password"
            name="password"
            {...register('password', registerOptions.password)}
          />
          <p className="errorMes">
            {errors?.password && errors.password.message}
          </p>
        </div>
        <div className="text-center errorMes">{userError}</div>
        <div className="row justify-content-center" disabled={isSubmitting}>
          <button type="submit" className="btn btn-primary mt-2">
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
