import React from 'react';

import styles from './conversationList.module.css';

const ChatContainer = ({ res, userInfo }) => {
  return (
    <>
      {res.isFetching && (
        <div
          className={`${styles.history_loader} spinner-border spinner-border-sm`}
        ></div>
      )}
      {res.isSuccess &&
        res.data.data.map((item) => {
          return (
            <div key={item._id + item.conversationId + item.senderId}>
              <li className="d-flex justify-content-between mb-4">
                <div
                  className={
                    userInfo?._id === item.senderId ? 'ml-auto mr-2' : 'ml-2'
                  }
                >
                  <div className={`mb-0 ${styles.message}`}>{item.content}</div>
                </div>
              </li>
            </div>
          );
        })}
    </>
  );
};

export default ChatContainer;
