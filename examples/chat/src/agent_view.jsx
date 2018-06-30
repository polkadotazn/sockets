import React from 'react';

import AgentChat from './agent_chat';

const AgentView = (props) => {
  console.log("agent", props);
  return (
    <div className="outer-chat-box">
      <div className="chat-holder">
        <AgentChat username={props.username} room={1} />
        <AgentChat username={props.username} room={2} />
      </div>
      <div className="instructions">

        <ol>
          <li>Press 'Enter' or click "send" to send message.</li>
          <li>To switch from chat 1 to chat 2, press tab twice.</li>
          <li>To switch from chat 2 to chat 1, press shift+tab twice.</li>
          <li>The input box will start blinking if the customer has been left unattended for longer than 15 seconds.</li>
        </ol>
      </div>
    </div>
  );
};

export default AgentView;
