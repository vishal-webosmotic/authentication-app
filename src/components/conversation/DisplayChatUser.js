import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import styles from './conversation.module.css';

const DisplayChatUser = ({ data }) => {
  const navigate = useNavigate('');
  const { id } = useParams();

  const handleConversationId = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    data.chatUser && (
      <div
        className={styles.cursor_pt}
        onClick={() => handleConversationId(data.conversationId)}
      >
        <li
          className={`p-2 ${data.conversationId === id && styles.current_user}`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
              <div className={styles.circle}>
                <span>{data.chatUser.firstname.charAt(0).toUpperCase()}</span>
              </div>
              <div className="pt-1 pointer">
                <p className="fw-bold mb-0">{data.chatUser.firstname}</p>
                <p className={`small mb-0 ${styles.small}`}>
                  {data.chatUser.email}
                </p>
              </div>
            </div>
          </div>
        </li>
      </div>
    )
  );
};

export default DisplayChatUser;
