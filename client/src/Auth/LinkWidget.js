import React  from 'react';
import {Link} from 'react-router-dom';

const LinkWidget = ({email}) => (
  <span>
    {Boolean(email) ? (
      <Link to="/auth/log-out">Log Out {email}</Link>
    ) : (
      <span>
        <Link to="/auth/log-in">Log In</Link> | <Link to="/auth/register">Sign Up</Link>
      </span>
    )}
  </span>
);

export default LinkWidget;
