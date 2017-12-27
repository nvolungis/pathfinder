import React          from 'react';
import ReactDOM       from 'react-dom';
import App            from '../App';
import {MemoryRouter} from 'react-router-dom';
import {Provider}     from 'react-redux';
import {mount}        from 'enzyme';
import store          from '../store';
import mockAxios      from 'jest-mock-axios';

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

describe('registration', () => {
  afterEach(() => {
    mockAxios.reset()
    store.dispatch({type: 'reset'});
  });

  it('users can sign up', async () => {
    const page  = new RegistrationPage();
    const email = 'test@email.com';

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    mockAxios.mockResponse({ status: 201, data: {user: {email}}});
    await asyncFlush();

    expect(page.text).toContain(`Welcome ${email}`);
  });

  it('shows validation errors', async() => {
    const page  = new RegistrationPage();
    const email = 'taken@email.com';

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    const errors = [{email: 'This email is taken'}];
    mockAxios.mockError({status: 400, errors});
    await asyncFlush();

    expect(page.text).toContain(`This email is taken`);
  });

});


class RegistrationPage {
  constructor() {
    this.wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/auth/register']} initialIndex={0} >
          <App />
        </MemoryRouter>
      </Provider>
    );
  }

  fillInEmailField(txt) {
    const email = this.wrapper.find('input[name="email"]');
    email.simulate('change', { target: { value: 'test@email.com' } });
  }

  fillInPasswordField(txt) {
    const password = this.wrapper.find('input[name="password"]');
    password.simulate('change', { target: { value: 'tstpassword' } });
  }

  submit() {
    const submit = this.wrapper.find('input[type="submit"]');
    submit.simulate('submit');
  }

  get text() {
    return this.wrapper.text();
  }
}


