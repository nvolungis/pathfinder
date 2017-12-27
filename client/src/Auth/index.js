import React           from 'react';
import {Switch, Route} from 'react-router';
import {Link}          from 'react-router-dom';
import {connect}       from 'react-redux';
import {form, user}    from '../store';
import './styles.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields.reduce((memo, {name, value=''}) => ({
        ...memo,
        [name]: value,
      }), {}),
    };
  }

  render() {
    const {errors={}} = this.props;

    return (
      <form
        className='form AuthScreen__form'
        onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state.fields);
        }}
      >
        {this.props.title && (
          <h1 className='AuthScreen__heading'>{this.props.title}</h1>
        )}
        {this.props.fields.map(field => (
          <label className='form__entry' key={field.name}>
            <span className='form__entry__label'>
              {field.Label}
            </span>
            <input
              type='text'
              name={field.name}
              className='form__entry__input'
              placeholder={field.placeholder}
              onChange={({target:{value}}) => {
                this.setState({
                  ...this.state,
                  fields: {
                    ...this.state.fields,
                    [field.name]: value
                  }
                });
              }}
            />
            {errors[field.name] && (
              <span> {errors[field.name]} </span>
            )}
          </label>
        ))}

        <div className='form__entry'>
          <input
            value="Register"
            type='submit'
            className='form__entry__input form__entry__input--submit'
          />
        </div>
      </form>
    )
  }
}

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

const LogOutForm = () => (
  <div>
    <span>log out</span>
  </div>
);

class RegisterForm extends React.Component {
  render() {
    const {onSubmit, user, form} = this.props;

    if (user.email) {
      return (
        <div>
          <h1>Welcome {user.email} </h1>
        </div>
      );
    }

    return (
      <Form
        onSubmit={onSubmit}
        title={form.title}
        fields={form.fields}
        errors={form.errors}
      />
    );
  }
}

const AuthScreen = ({
  match,
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
          />
        )}
      />
    </Switch>
  </section>
);

export const LinkWidget = ({isLoggedIn = false}) => (
  <span>
    {isLoggedIn ? (
      <Link to="/auth/log-out">Log Out</Link>
    ) : (
      <span>
        <Link to="/auth/log-in">Log In</Link> | <Link to="/auth/register">Sign Up</Link>
      </span>
    )}
  </span>
);

export const AuthScreenContainer = connect(
  state => ({
    registerForm : form.selectors.getForm(state, 'register'),
    user         : user.selectors.getUser(state),
  }),
  dispatch => ({
    onLogInSubmit    : data => dispatch(user.actions.createUser(data)),
    onRegisterSubmit : data => dispatch(user.actions.createUser(data)),
    onLogOutSubmit   : data => console.log(data),
  })
)(AuthScreen);
