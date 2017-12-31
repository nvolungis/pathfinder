import React             from 'react';
import ReactDOM          from 'react-dom';
import {Provider}        from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import store             from './store';
import history           from './store/history';
import App               from './App';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
