import React from 'react';

import { useNavigate } from 'react-router-dom';

import backArrow from '../../assets/back_arrow.svg';
import { useGetConversationsListQuery } from '../../services/authApi';
import styles from './conversation.module.css';
import DisplayChatUser from './DisplayChatUser';

const ChatUser = () => {
  const conversationsList = useGetConversationsListQuery();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.member}>
        <div className={styles.user}>Users</div>
        <button className={styles.btn_arrow} onClick={() => navigate('/')}>
          <img src={backArrow} className={styles.arrow_img} alt="back Arrow" />
        </button>
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
    </>
  );
};

export default ChatUser;
