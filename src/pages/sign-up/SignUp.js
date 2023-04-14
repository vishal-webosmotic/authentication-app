import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useSignupUserMutation } from '../../services/authApi';
import styles from '../page.module.css';

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm();
  // {
  // defaultValues: {
  //   firstname: 'john',
  //   lastname: 'cena',
  //   username: 'john1',
  //   email: 'abc@gmail.com',
  //   password: 'abcd@1234',
  // },
  // }
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  // const { errors, isSubmitting } = formState;
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
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 800);
    // });
  }
  const registerOptions = {
    name: {},
    email: {},
    password: {},
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="fname">FirstName</label>
            <input
              {...register('firstname')}
              name="name"
              type="text"
              // placeholder="firstName"
            />
            <div className="errorMes">
              {errors?.firstname && errors.firstname.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lname">LastName</label>
            <input
              {...register('lastname')}
              name="name"
              type="text"
              // placeholder="lastName"
            />
            <div className="errorMes">
              {errors?.lastname && errors.lastname.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Username</label>
            <input
              name="name"
              type="text"
              {...register('username', registerOptions.name)}
              // placeholder="userName"
            />
            <div className="errorMes">
              {errors?.name && errors.name.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              {...register('email', registerOptions.email)}
              // placeholder="email"
            />
            <div className="errorMes">
              {errors?.email && errors.email.message}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              // placeholder="password"
              {...register('password', registerOptions.password)}
            />
            <div className="errorMes">
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
            <Link to={'/signin'}>Already User</Link>
          </div>
        </form>
        {/* <button onClick={() => navigate('/signin')} className={styles.singInUp}>
          Sing In
        </button> */}
      </div>
    </div>
  );
}
