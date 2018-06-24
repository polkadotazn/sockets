import React from 'react';
import { Link } from 'react-router-dom';

const ChatterBox = ({ message }) => {
  return (
    <li>
      {message}
    </li>
  );
};

export default ChatterBox;
