import React from 'react';

import style from './HomePage.module.css';
const DisplayRow = ({ data }) => {
  return (
    <tr className={style.tr_css} key={data._id}>
      <td className={style.td}>{data.description}</td>
      <td className={style.td}>{data.title}</td>
      <td className={style.td}>{data.userId}</td>
    </tr>
  );
};

export default DisplayRow;
