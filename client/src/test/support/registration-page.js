import Page from './Page';

export default class RegistrationPage extends Page {
  constructor({initialState, store}) {
    super({
      initialState : initialState,
      location     : '/auth/register',
      store        : store,
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
