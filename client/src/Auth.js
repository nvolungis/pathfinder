import React  from 'react';
import {Link} from 'react-router-dom';

export const LinkWidget = ({isLoggedIn = false}) => (
  <span>
    {isLoggedIn ? (
      <Link to="/log-out">Log Out</Link>
    ) : (
      <span>
        <Link to="/log-in">Log In</Link> | <Link to="/register">Sign Up</Link>
      </span>
    )}
  </span>
);
