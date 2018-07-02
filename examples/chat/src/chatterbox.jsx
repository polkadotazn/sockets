import React from 'react';
import { Link } from 'react-router-dom';

const ChatterBox = (props) => {
  console.log("chatter", props);
  let user = "agent";
  let text;
  if (!props.username) {
    text = <div className="adios">{props.message}</div>;
  } else {
    if (props.username !== "Agent") {
      user = "customer";
    }
    text = (
      <div id={props.room}>
        <div className="chat-bubble" id={user}>{props.message}</div>
      </div>
    );
  }

  return text;
};

export default ChatterBox;
