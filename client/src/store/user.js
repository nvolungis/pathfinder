import request from './util/request';
import {form}  from '../store';

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

export const reducer = handleActions({
  [actions.setUser]: (state, {payload}) => {
    return payload;
  },
}, {});

/*
 * SAGAS
 */


export const saga = function* () {
  yield all([
    takeEvery(actions.createUser.toString(), createUser)
  ]);
};

const createUser = function* ({payload}) {
  try {
    const {data: {user: {email}}} = yield call(api.createUser, payload);
    yield put(actions.setUser({email}));
  } catch (e) {
    if (e.errors) {
      return yield setFormErrors(e.errors);
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
    errors: errors.reduce((memo, err) => ({
      ...memo,
      ...err,
    }), {}),
  }));
};
