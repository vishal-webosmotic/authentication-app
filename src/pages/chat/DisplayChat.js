import React from 'react';

import './DisplayChat.css';
import { useNavigate } from 'react-router-dom';

const DisplayChat = ({ data, setCurrentUser }) => {
  const navigate = useNavigate('');

  const handleConversationId = (id, data) => {
    setCurrentUser(data);
    navigate(`/chat/${id}`);
  };
  return (
    data.chatUser && (
      <>
        <li className="p-2 border-bottom">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row chat_user">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                width="60"
              />
              <div
                className="pt-1 pointer"
                onClick={() => handleConversationId(data.conversationId, data)}
              >
                <p className="fw-bold mb-0">{data.chatUser.firstname}</p>
                <p className="small text-muted">{data.chatUser.email}</p>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  );
};

export default DisplayChat;
