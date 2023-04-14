import React, { useState, useEffect } from 'react';

// import { useSelector } from 'react-redux';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { CardList } from '../components/card-list/CardList';
import { useAuth } from '../context/AuthContext';
import { useGetPostQuery } from '../services/authApi';
import DisplayRow from './DisplayRow';
import style from './HomePage.module.css';

const HomePage = () => {
  const { removeAuth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams({});
  const { userInfo } = useSelector((state) => state.auth);
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);
  const state = useGetPostQuery(pageNumber);
  // let x = useGetConversationsListQuery();
  // console.log(x?.data?.data);

  // const list = useGetConversationsQuery();
  // console.log(list);

  const handleLogout = () => {
    removeAuth('access_token');
  };
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
  console.log(screenSize);
  return (
    <>
      <div className="text-center font-weight-bold my-2">
        Name :{' '}
        {!userInfo.firstname ? (
          <>
            getting info....
            {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
          </>
        ) : (
          userInfo.firstname.charAt(0).toUpperCase() +
          userInfo.firstname.slice(1) +
          ' ' +
          userInfo.lastname
        )}
      </div>
      {state.isLoading ? (
        <div className={style.spinner}></div>
      ) : (
        <>
          {screenSize.dynamicWidth > 450 ? (
            <>
              <div className="table-responsive-sm">
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
              </div>
            </>
          ) : (
            <>
              {state.data?.data.map((item) => (
                <CardList key={item._id} card={item} />
              ))}
            </>
          )}
        </>
      )}

      <div className={style.btn_group}>
        <button
          disabled={pageNumber === 1 ? true : false}
          onClick={() => handlePreviousData()}
          className={style.btn_prev}
        >
          Prev
        </button>
        <button
          disabled={pageNumber === 2 ? true : false}
          onClick={() => handleNextData()}
          className={style.btn_next}
        >
          Next
        </button>
      </div>
      <button className={style.btn} onClick={() => handleLogout()}>
        Logout
      </button>
    </>
  );
};

export default HomePage;
