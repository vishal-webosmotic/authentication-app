import React from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useGetConversationsListQuery } from '../../services/authApi';
import styles from './conversation.module.css';
import DisplayChatUser from './DisplayChatUser';

const ChatUser = () => {
  const conversationsList = useGetConversationsListQuery();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.member}>
        <div className={styles.user}>User</div>
      </div>
      <div className={styles.user_list}>
        {conversationsList.isLoading
          ? 'Loading....'
          : conversationsList?.data?.data.map((item) => {
              return (
                <DisplayChatUser
                  key={item.chatUser._id + item?.conversationId}
                  data={item}
                />
              );
            })}
      </div>
      <Button
        className={`mt-2 ${styles.btn_margin}`}
        onClick={() => navigate('/')}
      >
        Home Page
      </Button>
    </>
  );
};

export default ChatUser;
