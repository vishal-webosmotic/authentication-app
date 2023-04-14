import React from 'react';

const DisplayRow = ({ index, data }) => {
  return (
    <tr key={index}>
      <td>{data.description}</td>
      <td>{data.title}</td>
      <td>{data.userId}</td>
    </tr>
  );
};

export default DisplayRow;
