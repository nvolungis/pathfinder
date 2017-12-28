import { createLogger }     from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import {
  rootReducer,
  rootSaga
} from './entities';

import {
  applyMiddleware,
  createStore,
} from 'redux';

const isDev = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(...[
    isDev ? createLogger() : undefined,
    sagaMiddleware,
  ].filter(m => Boolean(m)))
);

sagaMiddleware.run(rootSaga);

export default store;
