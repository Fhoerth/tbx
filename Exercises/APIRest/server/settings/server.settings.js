import serverSettings from './server.settings.json';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    port: serverSettings.port
  };
} else {
  module.exports = {
    port: serverSettings.dev_port
  };
}
