import React from "react";
import classNames from "classnames";
import moment from "moment";

import { useAuthState } from "../../context/auth";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const recieved = !sent;
  return (
    <OverlayTrigger
      placement={recieved ? "right" : "left"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}
        </Tooltip>
      }
      transition={false}>
      <div
        className={classNames("d-flex py-3", {
          "ml-auto": sent,
          "mr-auto": recieved,
        })}>
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": sent,
            "bg-secondary": recieved,
          })}>
          <p className={classNames({ "text-white": sent })}>
            {message.content}
          </p>
        </div>
      </div>
    </OverlayTrigger>
  );
}
