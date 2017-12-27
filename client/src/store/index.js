import { createLogger }     from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {all}                from 'redux-saga/effects';
import * as user            from './user';
import * as form            from './form';

import {
  applyMiddleware,
  createStore,
  combineReducers,
} from 'redux';

const isDev = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  form : form.reducer,
  user : user.reducer,
});

const rootReducer = (state, action) => {
  if(action.type === 'reset') {
    return {
      form: form.reducer(undefined, {}),
      user: user.reducer(undefined, {}),
    }
  }

  return combinedReducer(state, action);
};


const store = createStore(
  rootReducer,
  applyMiddleware(...[
    isDev ? createLogger() : undefined,
    sagaMiddleware,
  ].filter(m => Boolean(m)))
);

sagaMiddleware.run(function* () {
  yield all([
    user.saga(),
  ]);
});

export { form, user };

export default store;
