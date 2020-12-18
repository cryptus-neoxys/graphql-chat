import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import { useAuthDispatch } from "../../context/auth";
import Users from "../home/Users";

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

export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  return (
    <>
      <Row className="bg-white justify-content-around mb-2">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
        <Col xs={8}>
          {messagesLoading ? (
            <p>Loading ...</p>
          ) : messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>Messages</p>
          )}
        </Col>
      </Row>
    </>
  );
}