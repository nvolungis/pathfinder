import AuthPage from './auth-page';

export default class RegistrationPage extends AuthPage {
  constructor({initialState, store}) {
    super({
      initialState : initialState,
      location     : '/auth/register',
      store        : store,
    });
  }
}
