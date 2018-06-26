import React from 'react';
import { Link } from 'react-router-dom';

const ChatterBox = (props) => {
  return (
    <li>
      {props.username}: {props.message}
    </li>
  );
};

export default ChatterBox;
