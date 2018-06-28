import React from 'react';

import AgentChat from './agent_chat';

const AgentView = (props) => {
  console.log("agent", props);
  return (
    <div className="outer-chat-box">
      <div>
        <AgentChat username={props.username} room={1} />
        <AgentChat username={props.username} room={2} />
      </div>
      <div className="instructions">
        1. To switch from chat 1 to chat 2, press tab twice.
        2. To switch from chat 2 to chat 1, press shift+tab twice.
        3. The input box will start blinking if the customer has been left unattended for longer than 10 seconds.
      </div>
    </div>
  );
};

export default AgentView;
