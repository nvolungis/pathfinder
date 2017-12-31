import React            from 'react';
import store            from '../store';
import mockAxios        from './support/mock-axios';
import RegistrationPage from './support/registration-page';

describe('registration', () => {
  afterEach(() => {
    mockAxios.reset()
    store.dispatch({type: 'reset'});
    localStorage.clear();
  });

  it('users can sign up', async () => {
    const page  = new RegistrationPage({store});
    const email = 'test@email.com';

    expect(page.text).toContain('Sign Up')
    expect(page.text).toContain('Log In')

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    mockAxios.mockResponse({ status: 201, data: {user: {email}}});
    await page.allowRender();

    expect(page.text).toContain(`Log Out ${email}`);
    expect(page.text).not.toContain('Sign Up')
    expect(page.text).not.toContain('Log In')
    expect(localStorage.getItem('user')).toEqual('test@email.com');
  });

  it('shows client-side validation errors', () => {
    const page  = new RegistrationPage({store});
    const email = 'malformedEmail.com';

    page.fillInEmailField(email);
    page.blurEmailField();

    expect(page.text).toContain('Invalid email address')
  });

  it('shows server-side validation errors', async () => {
    const page  = new RegistrationPage({store});
    const email = 'taken@email.com';

    page.fillInEmailField(email);
    page.fillInPasswordField('tstpassword');
    page.submit();

    const errors = {email: {message: 'This email is taken'}};
    mockAxios.mockError({status: 400, data: {errors}});
    await page.allowRender();

    expect(page.text).toContain(`This email is taken`);
  });

  it('on mount, it redirects to homepage if user is populated', () => {
    const initialState = {user: {email: 'email@test.com'}};
    const page         = new RegistrationPage({store, initialState});

    expect(page.text).toContain('Home!');
  });
});


