import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './conversation.module.css';

const DisplayChat = ({ data }) => {
  const navigate = useNavigate('');
  const { id } = useParams();

  const handleConversationId = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    data.chatUser && (
      <div>
        <li
          className={`p-2 border-bottom  ${
            data.conversationId === id && styles.current_user
          }`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <div className={styles.circle}>
                <span>{data.chatUser.firstname.charAt(0).toUpperCase()}</span>
              </div>
              <div
                className="pt-1 pointer"
                onClick={() => handleConversationId(data.conversationId)}
              >
                <p className="fw-bold mb-0">{data.chatUser.firstname}</p>
                <p className="small mb-0">{data.chatUser.email}</p>
              </div>
            </div>
          </div>
        </li>
      </div>
    )
  );
};

export default DisplayChat;
