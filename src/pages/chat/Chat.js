import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';

import {
  useGetConversationsListQuery,
  useGetConversationsMutation,
} from '../../services/authApi';
import { socket } from '../../services/socket';
import DisplayChat from './DisplayChat';
import './DisplayChat.css';

export default function Chat() {
  const inputRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);

  const conversationsList = useGetConversationsListQuery();
  const [id, setId] = useState();
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
    if (id) {
      state(id);
    }
  }, [id, state]);

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
                  id={id}
                  setId={setId}
                  setCurrentUser={setCurrentUserData}
                />
              );
            })
          )}
        </Col>
        <Col sm={12} md={8}>
          <div className="scroll">
            {res.isSuccess &&
              res.data.map((item) => {
                console.log(item);
                return (
                  <div key={item._id}>
                    <li className="d-flex justify-content-between mb-4">
                      <div
                        className={
                          userInfo._id === item.senderId ? 'ml-auto mr-2' : ''
                        }
                      >
                        <div className="mb-0 message-blue">{item.content}</div>
                      </div>
                    </li>
                  </div>
                );
              })}
          </div>
          {res.isSuccess && (
            <div className="d-flex mb-2">
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
        </Col>
      </Row>
    </Container>
  );
}
