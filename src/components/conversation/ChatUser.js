import React from 'react';

import { useGetConversationsListQuery } from '../../services/authApi';
import styles from './conversation.module.css';
import DisplayChat from './DisplayChat';

const ChatUser = () => {
  const conversationsList = useGetConversationsListQuery();
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
                <DisplayChat
                  key={item.chatUser._id + item?.conversationId * 100}
                  data={item}
                />
              );
            })}
      </div>
    </>
  );
};

export default ChatUser;
