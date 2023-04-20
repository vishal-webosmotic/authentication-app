import React from 'react';

const ChatContainer = ({ res, userInfo }) => {
  return (
    <>
      {res.isSuccess &&
        res.data.map((item) => {
          return (
            <div key={item._id + item.conversationId + item.senderId}>
              <li className="d-flex justify-content-between mb-4">
                <div
                  className={
                    userInfo?._id === item.senderId ? 'ml-auto mr-2' : ''
                  }
                >
                  <div className="mb-0 message-blue">{item.content}</div>
                </div>
              </li>
            </div>
          );
        })}
    </>
  );
};

export default ChatContainer;
