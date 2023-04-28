import { useRef, useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useLazyGetConversationsQuery,
  useGetConversationsListQuery,
} from '../../services/authApi';
import { socket } from './../../services/socket';
import ChatContainer from './ChatContainer';
import styles from './conversationList.module.css';

const ChatList = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [getConversationList, res] = useLazyGetConversationsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const [currentUserData, setCurrentUserData] = useState();

  const conversationsList = useGetConversationsListQuery();

  const currentUserDetails = useRef({
    page: 1,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    let matchingData = conversationsList.data?.data.find((item) => {
      return item.conversationId.toString() === id.toString();
    });
    setCurrentUserData(matchingData);
    currentUserDetails.current['conversationId'] = id;
    currentUserDetails.current.page = 1;
    getConversationList({ page: currentUserDetails.current.page, id });
  }, [conversationsList.data?.data, getConversationList, id]);

  const updatePosition = () => {
    const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
    const lastPositionOfScroll = clientHeight + Math.abs(scrollTop);

    if (
      lastPositionOfScroll === scrollHeight &&
      !(res?.data?.totalPage === currentUserDetails.current.page)
    ) {
      currentUserDetails.current.page = currentUserDetails.current.page + 1;
      getConversationList({ page: currentUserDetails.current.page, id });
    }
  };

  function handleClick() {
    const message = {
      receiverId: currentUserData?.chatUser._id,
      content: inputRef.current.value,
    };
    socket.emit('sendMessage', message);
    inputRef.current.value = '';
    scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!id) {
    return <div className="text-center">No user selected</div>;
  }
  return (
    <>
      {!res.data || !userInfo.lastname ? (
        <>
          <div className="text-center">No Chat Found</div>
        </>
      ) : (
        <>
          <div className={styles.chat_header}>
            <div className={styles.active_user}>
              {currentUserData?.chatUser?.firstname.charAt(0).toUpperCase()}
            </div>

            <div className="fw-bold">
              {currentUserData?.chatUser?.firstname}
            </div>
          </div>
          {res?.originalArgs?.page === 1 && res.isFetching ? (
            <>
              <div className={styles.margin_auto}>
                <div className="spinner-border spinner-border-sm"></div>
              </div>
            </>
          ) : (
            <div className={styles.container_border}>
              <div
                className={styles.scroll}
                onScroll={updatePosition}
                ref={scrollRef}
              >
                <ChatContainer res={res} userInfo={userInfo} />
              </div>
            </div>
          )}
          <div className={`d-flex mb-2 mt-2 ${styles.input_message}`}>
            <input
              className="form-control"
              placeholder="Type message"
              type="text"
              ref={inputRef}
              onKeyDown={(e) => (e.key === 'Enter' ? handleClick() : null)}
            />
            <Button onClick={() => handleClick()} className="pt-2 ml-1">
              Send
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ChatList;
