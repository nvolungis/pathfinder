import React           from 'react';
import {Switch, Route} from 'react-router';
import RegisterForm    from './RegisterForm';
import LogInForm       from './LogInForm';
import LogOutForm      from './LogOutForm';
import {connect}       from 'react-redux';
import {form, user}    from '../store/entities';

const AuthScreen = ({
  match,
  onFieldFocus,
  onLogInSubmit,
  onLogOutSubmit,
  onRegisterSubmit,
  user,
  registerForm,
}) => (
  <section className='AuthScreen'>
    <Switch>
      <Route
        path={`${match.url}/log-in`}
        render={() => <LogInForm onSubmit={onLogInSubmit} />}
      />
      <Route
        path={`${match.url}/log-out`}
        render={() => <LogOutForm onSubmit={onLogOutSubmit} />}
      />
      <Route
        path={`${match.url}/register`}
        render={() => (
          <RegisterForm
            form={registerForm}
            user={user}
            onSubmit={onRegisterSubmit}
            clearError={onFieldFocus}
          />
        )}
      />
    </Switch>
  </section>
);

export default connect(
  state => ({
    registerForm : form.selectors.getForm(state, 'register'),
    user         : user.selectors.getUser(state),
  }),
  dispatch => ({
    onLogInSubmit    : data => dispatch(user.actions.createUser(data)),
    onRegisterSubmit : data => dispatch(user.actions.createUser(data)),
    onLogOutSubmit   : data => console.log(data),
    onFieldFocus     : data => dispatch(form.actions.clearError(data)),
  })
)(AuthScreen);

