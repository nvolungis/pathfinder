import { createLogger }     from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import history              from './history';

import {
  routerMiddleware as createRouterMiddleware
} from 'react-router-redux'

import {
  rootReducer,
  rootSaga
} from './entities';

import {
  applyMiddleware,
  createStore,
} from 'redux';

const isDev            = process.env.NODE_ENV === 'development';
const sagaMiddleware   = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  rootReducer,
  applyMiddleware(...[
    isDev ? createLogger() : undefined,
    sagaMiddleware,
    routerMiddleware,
  ].filter(m => Boolean(m)))
);

sagaMiddleware.run(rootSaga);

export default store;
