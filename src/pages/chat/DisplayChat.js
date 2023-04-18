import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './DisplayChat.css';

import { useGetConversationsQuery } from '../../services/authApi';

const DisplayChat = ({ data }) => {
  const [id, setId] = useState();

  const handleConversationId = (id) => {
    setId(id);
  };

  const state = useGetConversationsQuery(id);
  console.log(state);
  return (
    data.chatUser && (
      <>
        <Card key={data?.conversationId} style={{ width: '7rem' }}>
          <ListGroup key={data?.conversationId} variant="flush">
            <ListGroup.Item
              onClick={() => {
                handleConversationId(data.conversationId);
              }}
            >
              {data.chatUser.username}
            </ListGroup.Item>
            {/* <ListGroup.Item>{data.conversationId}</ListGroup.Item> */}
          </ListGroup>
        </Card>
        {state.isSuccess &&
          state.data.map((item) => {
            return (
              <>
                <div key={item._id}>message : {item.content}</div>
              </>
            );
          })}
      </>
    )
  );
};

export default DisplayChat;
