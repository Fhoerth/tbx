const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  module.exports = require('./webpack.prod.config');
} else {
  module.exports = require('./webpack.dev.config');
}
