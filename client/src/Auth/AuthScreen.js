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
            onSubmit={onRegisterSubmit}
            user={user}
          />
        )}
      />
    </Switch>
  </section>
);

export default connect(
  state => {
    const data = form.selectors.getForm(state, 'register');
    return {
      registerForm : data,
      user         : user.selectors.getUser(state),
    }
  },
  dispatch => ({
    onLogInSubmit    : data => dispatch(user.actions.createUser(data)),
    onRegisterSubmit : data => new Promise((resolve, reject) => {
      dispatch(user.actions.createUser({user: data, resolve, reject}));
    }),
    onLogOutSubmit   : data => dispatch(user.actions.logOut()),
    onFieldFocus     : data => dispatch(form.actions.clearError(data)),
  })
)(AuthScreen);

