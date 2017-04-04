import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './root.reducer';
import DevTools from '../../containers/DevTools';
import rootEpic from './root.epic';
import { createLogger } from 'redux-logger';

const epicMiddleware = createEpicMiddleware(rootEpic);
const logger = createLogger({
  collapsed: true,
  duration: true
});

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(epicMiddleware, routerMiddleware(browserHistory), logger),
      DevTools.instrument()
    )
  );

  if (module.hot) {
   // Enable Webpack hot module replacement for reducers
   module.hot.accept('./root.reducer', () => {
     const nextRootReducer = require('./root.reducer').default;
    //  const _rootEpic = require('./root.epic').default;
     store.replaceReducer(nextRootReducer);
    //  epicMiddleware.replaceEpic(_rootEpic);
   });
  }

  return store;
};

export default configureStore;
