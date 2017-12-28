import React      from 'react';
import {Redirect} from 'react-router-dom';
import Form       from './Form';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alreadyRegistered: Boolean(props.user.email)
    };
  }

  render() {
    const {
      clearError,
      form,
      onSubmit,
      user,
    } = this.props;

    if(this.state.alreadyRegistered) {
      return <Redirect to="/" />
    }

    if (user.email) {
      return (
        <div>
          <h1>Welcome {user.email}</h1>
        </div>
      );
    }

    return (
      <Form
        onSubmit={onSubmit}
        title={form.title}
        fields={form.fields}
        errors={form.errors}
        clearError={clearError}
      />
    );
  }
}

