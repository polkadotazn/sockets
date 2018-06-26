import React from 'react';

import Chat from './chat';

const UserView = (props) => {
  console.log("user", props);
  return (
    <div>
      <Chat username={props.username} />
    </div>
  );
};

export default UserView;
