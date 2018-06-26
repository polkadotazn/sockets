import React from 'react';

import Chat from './chat';

const AgentView = (props) => {
  console.log("agent", props);
  return (
    <div className="outer-chat-box">
      <Chat username={props.username} />
      <Chat username={props.username} />
    </div>
  );
};

export default AgentView;
