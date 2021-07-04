import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import reduxReset from 'redux-reset';
import rootReducer from './reducers';
import rootSagas from './sagas';

export * from './reducers';
export * from './actions';
export * from './selectors';

const sagaMiddleware = createSagaMiddleware();

const store = () => {
  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(rootSagas);

  return store;
};

export default store();