import React from 'react';
import { Link } from 'react-router-dom';

const ChatterBox = (props) => {
  let user = "agent-name";
  if (props.username !== "Agent") {
    user = "customer-name";
  }
  return (
    <li>
      <text className={user}>{props.username}</text>: {props.message}
    </li>
  );
};

export default ChatterBox;
