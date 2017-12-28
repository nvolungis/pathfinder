import React          from 'react';
import {mount}        from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {Provider}     from 'react-redux';
import App            from '../../App';

export default class Page {
  constructor({ initialState, location='/', store }) {
    if(initialState) {
      store.dispatch({
        type: 'setState',
        payload: initialState
      });
    }

    this.wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[location]} initialIndex={0} >
          <App />
        </MemoryRouter>
      </Provider>
    );
  }

  allowRender() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  get text() {
    return this.wrapper.text();
  }


}
