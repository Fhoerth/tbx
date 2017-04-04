if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.container.prod');
} else {
  module.exports = require('./Root.container.dev');
}
