import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useSignupUserMutation } from '../../services/authApi';
import styles from '../page.module.css';

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm();

  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const { errors } = formState;

  const [signupUser, res] = useSignupUserMutation();
  useEffect(() => {
    if (res.isError) {
      setMessage(res.error?.data?.message);
    } else if (res.isSuccess) {
      setMessage(res.data?.message);
      navigate('/signin');
    }
  }, [
    res.isError,
    res.isSuccess,
    res.error?.data?.message,
    res.data?.message,
    navigate,
  ]);

  function onSubmit(data) {
    signupUser(data);
    setMessage('');
  }

  const registerOptions = {
    name: { required: 'Enter Username' },
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
      <div className={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="fname">
              First name <span className={styles.required}>*</span>
            </label>
            <input
              {...register('firstname', {
                required: 'Enter Your First name ',
              })}
            />
            <div className={styles.errorMes}>
              {errors?.firstname && errors.firstname.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lname">
              Last name <span className={styles.required}>*</span>{' '}
            </label>
            <input
              {...register('lastname', {
                required: 'Enter Your Last name ',
              })}
            />

            <div className={styles.errorMes}>
              {errors?.lastname && errors.lastname.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>
              Username <span className={styles.required}>*</span>
            </label>
            <input {...register('username', registerOptions.name)} />
            <div className={styles.errorMes}>
              {errors?.username && errors.username.message}
            </div>
          </div>
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
          <div className={`mt-2 ${styles.error}`}>{message}</div>
          <div className="mt-2">
            <button type="submit" className="btn btn-primary mt-2">
              {res.isLoading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Submit
            </button>
          </div>
          <div className={styles.signUpButton}>
            <Link to={'/signin'}>Already User?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
