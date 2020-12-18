import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";

import { useMessageDispatch, useMessageState } from "../../context/message";

import Message from "./Message";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

function Messages() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true);

  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData]);

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a friend</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading ...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <Message key={message.uuid} message={message} />
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected, say Hi!</p>;
  }

  return (
    <Col xs={8} className="messages-box d-flex flex-column-reverse">
      {selectedChatMarkup}
    </Col>
  );
}

export default Messages;
