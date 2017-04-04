import React from 'react';
import { Route, IndexRoute } from 'react-router';

import LayoutComponent from './components/Layout/Layout.component';
import ListComponent from './components/List/List.mainComponent';

export default (
  <Route path="/" component={LayoutComponent}>
    <IndexRoute component={ListComponent} />
  </Route>
);
