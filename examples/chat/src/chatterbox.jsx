import React from 'react';
import { Link } from 'react-router-dom';

const ChatterBox = (props) => {
  console.log("chatter", props);
  let user = "agent-name";
  let text;
  if (!props.username) {
    text = <li>{props.message}</li>;
  } else {
    if (props.username !== "Agent") {
      user = "customer-name";
    }
    text = (
      <li>
        <text className={user}>{`${props.username}: `}</text>{props.message}
      </li>
    );
  }

  return text;
};

export default ChatterBox;
