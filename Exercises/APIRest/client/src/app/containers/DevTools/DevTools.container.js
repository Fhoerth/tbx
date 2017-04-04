import React from 'react';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
import ReduxSliderMonitor from 'redux-slider-monitor';
import ReduxDevToolsChartMonitor from 'redux-devtools-chart-monitor';
import { createDevTools } from 'redux-devtools';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-s" changeMonitorKey="ctrl-d"
    changePositionKey="ctrl-a" defaultIsVisible={false} defaultPosition="bottom">
    <LogMonitor />
    <DiffMonitor />
    <ReduxDevToolsChartMonitor />
    <ReduxSliderMonitor />
  </DockMonitor>
);

export default DevTools;
