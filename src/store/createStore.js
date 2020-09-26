import { createStore, applyMiddleware, compose } from 'redux';

export default (reducers, middlewares) => {
  const enhancer = compose( applyMiddleware(...middlewares));

  return createStore(reducers, enhancer);
};
