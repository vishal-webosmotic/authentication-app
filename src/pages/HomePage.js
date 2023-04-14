import React from 'react';

// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useGetPostQuery } from '../services/authApi';
import DisplayRow from './DisplayRow';
import style from './HomePage.module.css';

const HomePage = () => {
  const { removeAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams({});
  const { userInfo } = useSelector((state) => state.auth);

  const pageNumber = Number(searchParams.get('pageNumber')) || 1;

  const state = useGetPostQuery(pageNumber);
  const handleLogout = () => {
    removeAuth('access_token');
  };
  console.log('line 23', pageNumber);
  const handlePreviousData = () => {
    if (pageNumber === 2) {
      searchParams.delete('pageNumber');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ pageNumber: pageNumber - 1 });
    }
  };
  const handleNextData = () => {
    setSearchParams({ pageNumber: pageNumber + 1 });
  };

  return (
    <>
      <button className={style.btn} onClick={() => handleLogout()}>
        Logout
      </button>
      <div className="text-center font-weight-bold mb-2">
        Name :{' '}
        {!userInfo.firstname ? (
          <>
            <span className="spinner-border spinner-border-sm mr-1"></span>
          </>
        ) : (
          userInfo.firstname + userInfo.lastname
        )}
      </div>
      {state.isLoading ? (
        <div className={style.spinner}></div>
      ) : (
        <>
          <table className={`table-dark text-center ${style.center}`}>
            <thead className="mb-2">
              <tr>
                <th>Description</th>
                <th>Title</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {state.data?.data.map((item) => (
                <DisplayRow key={item._id} data={item} />
              ))}
            </tbody>
          </table>
          <div className={style.btn_group}>
            <button
              disabled={pageNumber === 1 ? true : false}
              onClick={() => handlePreviousData()}
              className={style.btn_prev}
            >
              Previous
            </button>
            <button
              disabled={pageNumber === 2 ? true : false}
              onClick={() => handleNextData()}
              className={style.btn_next}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
