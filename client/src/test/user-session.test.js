import Page      from './support/page';
import mockAxios from './support/mock-axios';
import store     from '../store';
import AuthPage  from './support/auth-page';

describe('session', () => {
  afterEach(() => {
    mockAxios.reset();
    store.dispatch({type: 'reset'});
    localStorage.clear();
  });

  describe('log out', () => {
    it('lets users log out', async () => {
      const email = 'email@test.com';
      localStorage.setItem('user', email);
      const state = {user: {email: 'email@test.com'}};
      const page  = new Page({location: '/', store, initialState: state});

      page.clickLogout();

      await page.allowRender();

      expect(page.text).toContain('Log In');
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('log in', () => {
    it('lets users log in', async () => {
      const page = new AuthPage({store, location: '/auth/log-in'});
      const email = 'test@email.com';

      expect(page.text).toContain('Email')

      page.fillInEmailField(email);
      page.fillInPasswordField('abc123');
      page.submit();

      mockAxios.mockResponse({ status: 201, data: {user: {email}}});

      await page.allowRender();

      expect(page.text).toContain(`Log Out ${email}`);
    });
  });
});
