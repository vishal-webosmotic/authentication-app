import React, { useState, useEffect } from 'react';

// import { useSelector } from 'react-redux';

import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { CardList } from '../components/card-list/CardList';
import { useAuth } from '../context/AuthContext';
import { useGetPostQuery } from '../services/authApi';
import DisplayRow from './DisplayRow';
import style from './HomePage.module.css';
const HomePage = () => {
  const { removeAuth } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({});
  const { userInfo } = useSelector((state) => state.auth);
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const [screenSize, setScreenSize] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    setScreenSize({
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

  const handleClick = () => {
    navigate('chat');
  };

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
      {state.isFetching ? (
        // <div className={style.loader_height}>
        <div>
          <span
            className={`spinner-border spinner-border-sm ${style.center_loader}`}
          ></span>
        </div>
      ) : (
        <>
          {state?.data?.data?.length === 0 ? (
            <div className="text-center">No data found</div>
          ) : screenSize.dynamicWidth > 450 ? (
            <>
              {/* <table className="table-responsive-sm table-dark table-bordered text-center"> */}
              <div className={style.table_wrapper}>
                <table
                  className={`table-responsive-sm table-dark table-bordered text-center ${style.center} ${style.tableWidth}
                  `}
                >
                  <thead className="mb-2">
                    <tr className={style.tr}>
                      <th className={style.th}>Description</th>
                      <th className={style.th}>Title</th>
                      <th className={style.th}>Id</th>
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
          disabled={pageNumber === 1}
          onClick={() => handlePreviousData()}
          className={`${style.button} ${style.btn_prev}`}
        >
          Prev
        </button>
        <button
          onClick={() => handleNextData()}
          className={`${style.button} ${style.btn_next} `}
          disabled={state?.currentData?.data?.length < 5 ? true : false}
        >
          Next
        </button>
      </div>

      {/* <div className={style.center1}> */}

      <div className={style.btn_center}>
        <button
          className={`btn-danger mb-2 mr-2 ${style.btn} button`}
          onClick={() => handleLogout()}
        >
          Logout
        </button>
        <button
          className={`btn-primary mb-2 ${style.btn} button`}
          onClick={() => handleClick()}
        >
          Chat
        </button>
      </div>
    </>
  );
};

export default HomePage;
