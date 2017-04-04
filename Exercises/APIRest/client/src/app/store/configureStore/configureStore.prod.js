import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './root.reducer';
import rootEpic from './root.epic';

const epicMiddleware = createEpicMiddleware(rootEpic);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(epicMiddleware),
  )
);

export default configureStore;
