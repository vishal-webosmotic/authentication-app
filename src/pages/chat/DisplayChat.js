import React from 'react';

import './DisplayChat.css';
import { useNavigate, useParams } from 'react-router-dom';

const DisplayChat = ({ data, setCurrentUser }) => {
  const navigate = useNavigate('');
  const { id } = useParams();

  const handleConversationId = (id, data) => {
    setCurrentUser(data);
    navigate(`/chat/${id}`);
  };

  return (
    data.chatUser && (
      <>
        <li
          className={`p-2 border-bottom  ${
            data.conversationId === id && 'current_user'
          }`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row chat_user">
              <div className="circle">
                <span>{data.chatUser.firstname.charAt(0).toUpperCase()}</span>
              </div>
              <div
                className="pt-1 pointer"
                onClick={() => handleConversationId(data.conversationId, data)}
              >
                <p className="fw-bold mb-0">{data.chatUser.firstname}</p>
                <p className="small mb-0">{data.chatUser.email}</p>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  );
};

export default DisplayChat;
