import Page from './Page';

export default class AuthPage extends Page {
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

  blurEmailField() {
    this.email.simulate('blur');
  }

  fillInEmailField(txt) {
    this.email.simulate('change', { target: { value: txt } });
  }

  fillInPasswordField(txt) {
    this.password.simulate('change', { target: { value: txt} });
  }

  focusEmailField() {
    this.email.simulate('focus');
  }

  submit() {
    const submit = this.wrapper.find('button[type="submit"]');
    submit.simulate('submit');
  }
}
