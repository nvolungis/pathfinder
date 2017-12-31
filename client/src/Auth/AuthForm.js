import React                from 'react';
import { Field, reduxForm } from 'redux-form'
import {Redirect}           from 'react-router-dom';
import RenderField          from './RenderField';

const RegisterForm = props => {
  const { handleSubmit, submitting } = props

  return (
    <form className='form AuthScreen__form' onSubmit={handleSubmit}>
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field name="password" type="password" component={RenderField} label="Password" />
      <div>
        <button
          type="submit"
          disabled={submitting}
          className='form__entry__input form__entry__input--submit'
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

const validate = values => {
  const errors = {}
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
};

export default reduxForm({
  form: 'syncValidation',
  validate,
})(RegisterForm)
