import React from 'react';

const DisplayChat = ({ data }) => {
  return (
    data.chatUser && (
      <tr key={data.chatUser._id}>
        <td>{data.chatUser.email}</td>
        <td>{data.chatUser.firstname}</td>
        <td>{data.chatUser.lastname}</td>
        <td>{data.chatUser.username}</td>
        <td>{data.chatUser._id}</td>
        <td>{data.conversationId}</td>
        <td>
          <button key={data.conversationId}>xyz</button>
        </td>
      </tr>
    )
  );
};

export default DisplayChat;
