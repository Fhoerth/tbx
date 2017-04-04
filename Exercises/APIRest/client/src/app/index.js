import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import RootContainer from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore({});

const history = syncHistoryWithStore(browserHistory, store);
const rootEl = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  render(
    <RootContainer store={store} history={history} />,
    rootEl
  );

} else {
  const { AppContainer } = require('react-hot-loader');
  const appInstance = render(
    <AppContainer>
      <RootContainer store={store} history={history} />
    </AppContainer>,
    rootEl
  );

  if (module.hot) {
    const reactDeepForceUpdate = require('react-deep-force-update');
    module.hot.accept('./containers/Root', () => {
      const NextApp = require('./containers/Root').default;
      reactDeepForceUpdate(appInstance);
    });
  }
}
