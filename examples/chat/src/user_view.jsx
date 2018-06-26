import React from 'react';

import Chat from './chat';

const UserView = (props) => {
  return (
    <div className="outer-chat-box">
      <Chat username={props.username} />
    </div>
  );
};

export default UserView;
