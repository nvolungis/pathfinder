import React             from 'react';
import {mount}           from 'enzyme';
// import {MemoryRouter} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux'
import {Provider}        from 'react-redux';
import App               from '../../App';
import history           from '../../store/history';
import {push}            from 'react-router-redux';

// <MemoryRouter initialEntries={[location]} initialIndex={0} >
//   <App />
// </MemoryRouter>

export default class Page {
  constructor({ initialState, location='/', store }) {
    if (initialState) {
      store.dispatch({
        type    : 'setState',
        payload : initialState,
      });
    }

    store.dispatch(push(location));

    this.wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }

  clickLogout() {
    const logout = this.wrapper.find('a[href="/auth/log-out"]')
    logout.simulate('click', {button:0});
  }

  allowRender() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  get text() {
    return this.wrapper.text();
  }


}
