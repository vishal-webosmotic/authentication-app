import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetConversationsListQuery } from '../../services/authApi';
import DisplayChat from './DisplayChat';
const Chat = () => {
  const conversationsList = useGetConversationsListQuery();
  console.log(conversationsList?.data?.data);
  const navigate = useNavigate();
  return (
    <>
      {conversationsList?.data?.data.map((item) => (
        <DisplayChat key={item.conversationId} data={item} />
      ))}
      <button onClick={() => navigate('/')}>Back</button>
    </>
  );
};

export default Chat;
