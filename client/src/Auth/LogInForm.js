import React from 'react';
import Form  from './Form';

const LogInForm = ({onSubmit}) => (
  <Form
    onSubmit={onSubmit}
    title="Log In"
    fields={[{
      name: 'email',
      label: 'Email',
      placeholder: 'neil@gmail.com',
    }, {
      name: 'password',
      label: 'Password',
      placeholder: '********',
    }]}
  />
);

export default LogInForm;
