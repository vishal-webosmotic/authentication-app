import React, { useState, useRef, useEffect } from 'react';

import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetConversationsListQuery,
  useLazyGetConversationsQuery,
} from '../../services/authApi';
import { socket } from '../../services/socket';
// import { setConversionList } from '../../store/authSlice';
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

  const [page, setPage] = useState(1);
  const [getConversationList, res] = useLazyGetConversationsQuery();

  // console.log('line 31', res);
  function handleClick() {
    console.log(currentUserData);
    const message = {
      receiverId: currentUserData?.chatUser._id,
      content: inputRef.current.value,
    };
    socket.emit('sendMessage', message);
    inputRef.current.value = '';
  }

  const updatePosition = () => {
    const { clientHeight, scrollTop, scrollHeight } = scrollRef.current;
    const lastPositionOfScroll = clientHeight + Math.abs(scrollTop);
    // console.log(clientHeight, scrollTop, scrollHeight);
    if (lastPositionOfScroll === scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (id) {
      // if (data.data.totalPage == currentIdObj?.lastArg.page) {
      getConversationList({ page, id });
      // }
    }
  }, [getConversationList, id, page]);

  useEffect(() => {
    if (id) {
      if (!currentUserData) {
        let matchingData = conversationsList.data?.data.find((item) => {
          return item.conversationId.toString() === id.toString();
        });
        setCurrentUserData(matchingData);
      }
    }
  }, [
    conversationsList.data?.data,
    currentUserData,
    getConversationList,
    id,
    page,
  ]);

  // useEffect(() => {
  //   if (res?.isSuccess) {
  //     console.log(page, res);
  //   }
  //   // if (!res.isSuccess) {
  //   //   return;
  //   // }
  //   // console.log()
  //   // if (page - 1 == res?.totalPage) {
  //   //   console.log('line 56');
  //   //   // setPage(1);
  //   // }
  // }, [page, res, res?.isSuccess]);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={4} className="bg chat-list">
          <h5>Member</h5>
          {conversationsList.isLoading
            ? // <div className="css-dom"></div>
              'Loading'
            : conversationsList?.data?.data.map((item) => {
                return (
                  <DisplayChat
                    key={item.chatUser._id + item?.conversationId * 100}
                    data={item}
                    setCurrentUser={setCurrentUserData}
                  />
                );
              })}
        </Col>
        <Col sm={12} md={8}>
          {res.isLoading || !userInfo.lastname ? (
            <div className="text-center">No Chat Found</div>
          ) : (
            <>
              <div className="scroll" onScroll={updatePosition} ref={scrollRef}>
                <ChatContainer res={res} userInfo={userInfo} />
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
        </Col>
      </Row>
    </Container>
  );
}
