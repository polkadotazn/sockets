import React from 'react';

import Chat from './chat';

const UserView = (props) => {
  return (
    <div>
      <div className="outer-chat-box">
        <Chat username={props.username} />
        <div className="instructions">
          <ol>
            <li>Press 'Enter' or click "send" to send message.</li>
            <li>An agent will be with you shortly.</li>
            <li>Close the window to exit from the chat.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserView;
