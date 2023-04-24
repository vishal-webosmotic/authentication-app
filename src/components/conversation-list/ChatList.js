import { useRef, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import backArrow from '../../assets/back_arrow.svg';
import { useLazyGetConversationsQuery } from '../../services/authApi';
import ChatContainer from './ChatContainer';
import styles from './conversationList.module.css';

const ChatList = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [getConversationList, res] = useLazyGetConversationsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const currentUserDetails = useRef({
    page: 1,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    currentUserDetails.current['conversationId'] = id;
    currentUserDetails.current.page = 1;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    getConversationList({ page: currentUserDetails.current.page, id });
  }, [getConversationList, id]);

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

  return (
    <>
      {(id && res.isLoading) || !userInfo.lastname ? (
        <div className="text-center">No Chat Found</div>
      ) : (
        <>
          {id && res.isSuccess && (
            <>
              <div className={styles.chat_header}>
                <button
                  className={styles.btn_arrow}
                  onClick={() => navigate(-1)}
                >
                  <img
                    src={backArrow}
                    className={styles.arrow_img}
                    alt="back Arrow"
                  />
                </button>
                <div className={styles.active_user}>
                  {/* {currentUserData?.chatUser?.firstname.charAt(0).toUpperCase()} */}
                </div>
              </div>
            </>
          )}
          <div className={id && styles.container_border}>
            <div
              className={styles.scroll}
              onScroll={updatePosition}
              ref={scrollRef}
            >
              <ChatContainer res={res} userInfo={userInfo} />
            </div>
          </div>
          {res.isSuccess && (
            <div className="d-flex mb-2 mt-2">
              <input
                className="form-control"
                placeholder="Type message"
                type="text"
                ref={inputRef}
              />
              <Button className="pt-2 ml-1">Send</Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatList;
