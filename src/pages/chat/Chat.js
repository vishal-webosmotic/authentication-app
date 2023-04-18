import React, { useState, useEffect, useRef } from 'react';

import './DisplayChat.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  // MDBIcon,
  MDBBtn,
  MDBTypography,
  // MDBTextArea,
  MDBCardFooter,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

import {
  useGetConversationsListQuery,
  useGetConversationsMutation,
} from '../../services/authApi';
import { socket } from '../../services/socket';
import DisplayChat from './DisplayChat';

export default function Chat() {
  const inputRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);

  const conversationsList = useGetConversationsListQuery();
  const [id, setId] = useState();
  // const [currentUserData, setCurrentUserData] = useState();

  const [state, res] = useGetConversationsMutation();
  let x;
  function handleClick() {
    x = inputRef.current.value;
    console.log('lien 37', x);
    inputRef.current.value = '';
  }

  useEffect(() => {
    socket.on('sendMessage', (obj) => {});
    if (id) {
      state(id);
    }
  }, [id, state]);

  // const checker = userInfo._id === currentUserData?.chatUser?._id;
  // console.log(checker, userInfo._id, currentUserData?.chatUser?._id);
  return (
    <MDBContainer fluid className="py-5">
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>
          {conversationsList.isLoading ? (
            <div className="css-dom"></div>
          ) : (
            <>
              <MDBCard>
                <MDBCardBody>
                  <MDBTypography listUnStyled className="mb-0">
                    {conversationsList?.data?.data.map((item) => {
                      return (
                        <DisplayChat
                          key={item.chatUser._id + item.conversationId}
                          data={item}
                          id={id}
                          setId={setId}
                          // setCurrentUser={setCurrentUserData}
                        />
                      );
                    })}
                  </MDBTypography>
                </MDBCardBody>
              </MDBCard>
            </>
          )}
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          {res.isLoading ? (
            <div className="chat-skeleton"></div>
          ) : (
            res.isSuccess &&
            res.data.map((item) => {
              console.log('line 89', item);
              return (
                <MDBTypography key={item._id} listUnStyled>
                  <li className="d-flex justify-content-between mb-4">
                    <MDBCard
                      className={userInfo._id === item.senderId && 'left-chat'}
                    >
                      {/* <MDBCardHeader className="d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">
                          {currentUserData.chatUser.firstname}
                        </p>
                      </MDBCardHeader> */}
                      <MDBCardBody>
                        <p className="mb-0">{item.content}</p>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                </MDBTypography>
              );
            })
          )}
          {res.isSuccess && (
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <MDBInputGroup className="mb-0">
                <input
                  className="form-control"
                  placeholder="Type message"
                  type="text"
                  ref={inputRef}
                />
                <MDBBtn
                  onClick={handleClick}
                  color="warning"
                  style={{ paddingTop: '.55rem' }}
                >
                  Button
                </MDBBtn>
              </MDBInputGroup>
            </MDBCardFooter>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
