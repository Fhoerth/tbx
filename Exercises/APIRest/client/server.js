import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfigFactory from './webpack.dev.config';
import historyApiFallback from 'connect-history-api-fallback';
import compression from 'compression';
import { config } from './config/config';

const appFactory = locale => {
  const app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(compression({ threshold: 0 }));
    app.use(express.static(config.distDir));
  } else {
    const webpackConfig = webpackConfigFactory(locale);
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: '/'
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(historyApiFallback());
  }

  return app;
};

const app = appFactory();
if (process.env.NODE_ENV === 'production') {
  app.listen(config.prodPort, function () {
    console.log(`Listening on port ${config.prodPort}!`);
  });
} else {
  app.listen(config.devPort, function () {
    console.log(`Listening on port ${config.devPort}!`);
  });
}
