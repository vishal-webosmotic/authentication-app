import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetConversationsListQuery,
  useGetConversationsMutation,
} from '../../services/authApi';
import { socket } from '../../services/socket';
import { setConversionList } from '../../store/authSlice';
import DisplayChat from './DisplayChat';
import './DisplayChat.css';

export default function Chat() {
  const inputRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  // const { payload } = conversionList;
  // console.log('lien 23', payload?.payload);
  const { id } = useParams();
  const dispatch = useDispatch();

  const conversationsList = useGetConversationsListQuery();
  const [currentUserData, setCurrentUserData] = useState();
  const [state, res] = useGetConversationsMutation();
  function handleClick() {
    const message = {
      receiverId: currentUserData.chatUser._id,
      content: inputRef.current.value,
    };
    socket.emit('sendMessage', message);
    inputRef.current.value = '';
  }

  useEffect(() => {
    socket.on('getMessage', () => {
      console.log('getMessage');
    });
    if (id) {
      state(id);
    }
  }, [id, state]);

  useEffect(() => {
    if (res.isSuccess && res.data) {
      dispatch(setConversionList(res.data));
    }
  }, [dispatch, res?.data, res?.isSuccess]);

  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={4} className="bg chat-list">
          <h5>Member</h5>
          {conversationsList.isLoading ? (
            <div className="css-dom"></div>
          ) : (
            conversationsList?.data?.data.map((item) => {
              return (
                <DisplayChat
                  key={item.chatUser._id + item.conversationId}
                  data={item}
                  setCurrentUser={setCurrentUserData}
                />
              );
            })
          )}
        </Col>
        <Col sm={12} md={8}>
          {res.isLoading || !userInfo.lastname ? (
            <div className="text-center">No Chat Found</div>
          ) : (
            <>
              <div className="scroll">
                {res.isSuccess &&
                  res.data.map((item) => {
                    return (
                      <div key={item._id}>
                        <li className="d-flex justify-content-between mb-4">
                          <div
                            className={
                              userInfo?._id === item.senderId
                                ? 'ml-auto mr-2'
                                : ''
                            }
                          >
                            <div className="mb-0 message-blue">
                              {item.content}
                            </div>
                          </div>
                        </li>
                      </div>
                    );
                  })}
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
