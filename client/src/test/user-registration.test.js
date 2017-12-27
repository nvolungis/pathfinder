import React          from 'react';
import ReactDOM       from 'react-dom';
import store          from '../store';
import mockAxios      from './support/mock-axios';
import Page           from './support/page';

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

describe('registration', () => {
  afterEach(() => {
    mockAxios.reset()
    store.dispatch({type: 'reset'});
    localStorage.clear();
  });

  it('users can sign up', async () => {
    const page  = new RegistrationPage();
    const email = 'test@email.com';

    expect(page.text).toContain('Sign Up')
    expect(page.text).toContain('Log In')

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    mockAxios.mockResponse({ status: 201, data: {user: {email}}});
    await asyncFlush();

    expect(page.text).toContain(`Welcome ${email}`);
    expect(page.text).toContain(`Log Out ${email}`);
    expect(page.text).not.toContain('Sign Up')
    expect(page.text).not.toContain('Log In')
    expect(localStorage.getItem('user')).toEqual('test@email.com');
  });

  it('shows validation errors', async () => {
    const page  = new RegistrationPage();
    const email = 'taken@email.com';

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    const errors = [{email: 'This email is taken'}];
    mockAxios.mockError({status: 400, data: {errors}});
    await asyncFlush();

    expect(page.text).toContain(`This email is taken`);
  });

  it('clears errors on focus', async () => {
    const errors = {email: 'This email is taken'};
    const state  = {form: {register: {errors}}};
    const page   = new RegistrationPage(state);

    expect(page.text).toContain(`This email is taken`);

    page.focusEmailField();
    await asyncFlush();

    expect(page.text).not.toContain('This email is taken');
  });

  it('on mount, it redirects to homepage if user is populated', () => {
    const state  = {user: {email: 'email@test.com'}};
    const page = new RegistrationPage(state);

    expect(page.text).toContain('Home!');
  });
});


class RegistrationPage extends Page {
  constructor(initialState) {
    super({
      initialState : initialState,
      location     : '/auth/register',
      store        : store
    });
  }

  get email() {
    return this.wrapper.find('input[name="email"]');
  }

  get password() {
    return this.wrapper.find('input[name="password"]');
  }

  fillInEmailField(txt) {
    this.email.simulate('change', { target: { value: 'test@email.com' } });
  }

  fillInPasswordField(txt) {
    this.password.simulate('change', { target: { value: 'tstpassword' } });
  }

  focusEmailField() {
    this.email.simulate('focus');
  }

  submit() {
    const submit = this.wrapper.find('input[type="submit"]');
    submit.simulate('submit');
  }
}
