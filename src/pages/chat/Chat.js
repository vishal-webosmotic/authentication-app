import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ChatList from '../../components/conversation-list/ChatList';
import conversationListStyle from '../../components/conversation-list/conversationList.module.css';
import styles from '../../components/conversation/conversation.module.css';
import ChatUser from './../../components/conversation/ChatUser';

export default function Chat() {
  return (
    <Container className={styles.parents_height} fluid>
      <Row className={styles.parents_height}>
        <Col
          className={`${styles.bg} ${styles.chat_user_container}`}
          sm={12}
          md={4}
        >
          <ChatUser />
        </Col>
        <Col
          className={`mt-2 ${conversationListStyle.chat_list_container}`}
          sm={12}
          md={8}
        >
          <ChatList />
        </Col>
      </Row>
    </Container>
  );
}
