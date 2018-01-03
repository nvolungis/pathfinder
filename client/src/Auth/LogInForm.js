import React                from 'react';
import { Field, reduxForm } from 'redux-form'
import {Redirect}           from 'react-router-dom';
import RenderField          from './RenderField';

const LogInForm = props => {
  const { handleSubmit, submitting, user, error } = props

  if (user && user.email) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <form className='form AuthScreen__form' onSubmit={handleSubmit}>
      <h1 className='AuthScreen__heading'>Log In</h1>
      {error && (
        <div className='AuthScreen__form__error'>
          <div className='form__error'> {error} </div>
        </div>
      )}
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field name="password" type="password" component={RenderField} label="Password" />
      <div>
        <button
          type="submit"
          disabled={submitting}
          className='form__entry__input form__entry__input--submit'
        >
          Log In
        </button>
      </div>
    </form>
  )
}

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
};

export default reduxForm({
  form: 'logIn',
  validate,
})(LogInForm);
