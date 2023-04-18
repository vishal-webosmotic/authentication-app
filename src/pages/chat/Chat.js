import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetConversationsListQuery } from '../../services/authApi';
import DisplayChat from './DisplayChat';
import './DisplayChat.css';

const Chat = () => {
  const conversationsList = useGetConversationsListQuery();
  console.log(conversationsList?.data?.data);
  const navigate = useNavigate();
  return (
    <>
      <div className="wrapper">
        <div className="left">
          <div className="ChatUser">
            {conversationsList?.data?.data.map((item) => (
              <DisplayChat key={item.conversationId} data={item} />
            ))}
          </div>
        </div>
        <div className="right">
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
