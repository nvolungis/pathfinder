import request   from '../util/request';
import * as form from './form';

import {
  createAction,
  handleActions,
} from 'redux-actions';

import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';

/*
 * ACTIONS
 */

export const actions = {
  createUser : createAction('create user'),
  setUser    : createAction('set user'),
  logOut     : createAction('log out'),
};

/*
 * SELECTORS
 */

export const selectors = {
  getUser: state => state.user,
};

/*
 * REDUCER
 */

export const initialState = {};

export const reducer = handleActions({
  [actions.setUser]: (state, {payload}) => {
    return payload;
  },

  [actions.logOut]: (state, {payload}) => {
    return initialState;
  },
}, initialState);

/*
 * SAGAS
 */


export const saga = function* () {
  yield all([
    takeEvery(actions.createUser.toString(), createUser),
    takeEvery(actions.setUser.toString(), saveUserToLocalStorage),
    takeEvery(actions.logOut.toString(), removeUserFromLocalStorage),
  ]);
};

const createUser = function* ({payload}) {
  const hasErrors = e => {
    return e.response && e.response.data && e.response.data.errors;
  };

  try {
    const {data: {user: {email}}} = yield call(api.createUser, payload);
    yield put(actions.setUser({email}));
  } catch (e) {
    if(hasErrors(e)) {
      return yield setFormErrors(e.response.data.errors);
    }
    console.log(e);
  }
};

const api = {
  createUser: (attrs) => request('post', 'user', attrs)
};

const setFormErrors = function* (errors) {
  yield put(form.actions.setErrors({
    formId: 'register',
    errors: errors,
  }));
};

const saveUserToLocalStorage = function ({payload: {email}}) {
  localStorage.setItem('user', email || '');
};

const removeUserFromLocalStorage = function () {
  localStorage.removeItem('user');
};
