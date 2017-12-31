import request             from '../util/request';
import * as form           from './form';
import {push}              from 'react-router-redux';
import { SubmissionError } from 'redux-form'

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

const createUser = function* ({payload: {user, resolve, reject}}) {
  const getErrors = e => {
    if (e.response && e.response.data && e.response.data.errors) {
      const errors = e.response.data.errors;

      return Object.keys(errors).reduce((memo, err) => {
        return {
          ...memo,
          [err]: errors[err].message,
        }
      }, {});
    }

    return false;
  };

  try {
    const {data: {user: {email}}} = yield call(api.createUser, user);
    yield put(actions.setUser({email}));
    yield put(push('/'));
    yield resolve();
  } catch (e) {
    const errors = getErrors(e);
    if (errors) {
      return reject(new SubmissionError(errors));
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
