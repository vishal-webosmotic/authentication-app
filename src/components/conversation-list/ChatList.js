import { useRef, useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import backArrow from '../../assets/back_arrow.svg';
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
  const [getConversationList, res, ...lastArg] = useLazyGetConversationsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [currentUserData, setCurrentUserData] = useState();
  // const prevData = usePrevious(currentUserData);
  // function usePrevious(value) {
  //   console.log('line 75', value);
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //     console.log('line 81');
  //   }, [value]);
  //   return ref.current;
  // }
  // console.log('lien 86', prevData);

  const conversationsList = useGetConversationsListQuery();

  const currentUserDetails = useRef({
    page: 1,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    currentUserDetails.current['conversationId'] = id;
    currentUserDetails.current.page = 1;
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

  function handleClick() {
    const message = {
      receiverId: currentUserData?.chatUser._id,
      content: inputRef.current.value,
    };
    socket.emit('sendMessage', message);
    inputRef.current.value = '';
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    if (!currentUserData) {
      let matchingData = conversationsList.data?.data.find((item) => {
        return item.conversationId.toString() === id.toString();
      });
      setCurrentUserData(matchingData);
    }
  }, [conversationsList.data?.data, currentUserData, id]);

  if (!id) {
    return <div className="text-center">No user selected</div>;
  }
  return (
    <>
      {res.isLoading || !userInfo.lastname ? (
        <div className="text-center">No Chat Found</div>
      ) : (
        <>
          <>
            {
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
            }
          </>
          {lastArg[0]?.lastArg.page === 1 && res.isFetching ? (
            <div className={styles.margin_auto}>
              {/* <div className={styles.loader}></div> */}
              Loader
              {/* {console.log('if')} */}
            </div>
          ) : (
            <div className={styles.container_border}>
              {/* {console.log('else')} */}
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
