import React from "react";
import classNames from "classnames";

import { useAuthState } from "../../context/auth";

export default function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;
  const recieved = !sent;
  return (
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
        <p className={classNames({ "text-white": sent })}>{message.content}</p>
      </div>
    </div>
  );
}
