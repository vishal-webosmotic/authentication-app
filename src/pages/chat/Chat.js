import React, { useState, useRef, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import backArrow from '../../assets/back_arrow.svg';
import {
  useGetConversationsListQuery,
  useLazyGetConversationsQuery,
} from '../../services/authApi';
import { socket } from '../../services/socket';
import ChatContainer from './ChatContainer';
import DisplayChat from './DisplayChat';
import './DisplayChat.css';

export default function Chat() {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const conversationsList = useGetConversationsListQuery();
  const [currentUserData, setCurrentUserData] = useState();

  const [getConversationList, res] = useLazyGetConversationsQuery();

  const currentUserDetails = useRef({
    page: 1,
  });

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
    currentUserDetails.current['conversationId'] = id;
    currentUserDetails.current.page = 1;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    getConversationList({ page: currentUserDetails.current.page, id });
  }, [getConversationList, id]);

  useEffect(() => {
    if (id) {
      if (!currentUserData) {
        let matchingData = conversationsList.data?.data.find((item) => {
          return item.conversationId.toString() === id.toString();
        });
        setCurrentUserData(matchingData);
      }
    }
  }, [conversationsList.data?.data, currentUserData, id]);

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
    <Container fluid>
      <Row>
        <Col sm={12} md={4} className="bg chat-list">
          <div className="member">
            <div className="user">User</div>
          </div>
          <div className="user_list">
            {conversationsList.isLoading
              ? // <div className="css-dom"></div>
                'Loading....'
              : conversationsList?.data?.data.map((item) => {
                  return (
                    <DisplayChat
                      key={item.chatUser._id + item?.conversationId * 100}
                      data={item}
                      setCurrentUser={setCurrentUserData}
                    />
                  );
                })}
          </div>
        </Col>
        <Col sm={12} md={8}>
          <>
            {(id && res.isLoading) || !userInfo.lastname ? (
              <div className="text-center">No Chat Found</div>
            ) : (
              <>
                {id && res.isSuccess && (
                  <>
                    <div className="active_user_header">
                      <button className="btn_arrow">
                        <img
                          src={backArrow}
                          className="arrow_img"
                          alt="back Arrow"
                        />
                      </button>
                      <div className="active_user">
                        {currentUserData?.chatUser?.firstname
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    </div>
                  </>
                )}
                <div className={id && 'container_border'}>
                  <div
                    className="scroll"
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
                    <Button onClick={handleClick} className="pt-2 ml-1">
                      Send
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        </Col>
      </Row>
    </Container>
  );
}
