import { combineReducers } from 'redux';
import {all}               from 'redux-saga/effects';
import deepmerge           from 'deepmerge';
import * as form           from './form';
import * as user           from './user';

const combinedReducer = combineReducers({
  form : form.reducer,
  user : user.reducer,
});

export const rootReducer = (state, action) => {
  const initialState = {
    form: form.initialState,
    user: user.initialState,
  };

  if(action.type === 'reset') {
    return initialState;
  }

  if(action.type === 'setState') {
    return deepmerge(initialState, action.payload);
  }

  return combinedReducer(state, action);
};

export const rootSaga = function* () {
  yield all([
    user.saga(),
  ]);
}

export {user, form}
