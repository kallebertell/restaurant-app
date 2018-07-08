import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();
const appRouterMiddleware = routerMiddleware(history);

// TODO: you might want to disable dev tools in production
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, appRouterMiddleware),
);

const store = createStore(
  connectRouter(history)(rootReducer),
  enhancer
);

sagaMiddleware.run(rootSaga)

export default store;
