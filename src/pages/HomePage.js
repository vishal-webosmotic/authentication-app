import React from 'react';

import { useAuth } from '../context/AuthContext';
import style from './HomePage.module.css';

const HomePage = () => {
  const { removeAuth } = useAuth();

  const handleLogout = () => {
    removeAuth('access_token');
  };

  return (
    <>
      <div className="text-center">HomePage</div>
      <button className={style.center} onClick={() => handleLogout()}>
        Logout
      </button>
    </>
  );
};

export default HomePage;
