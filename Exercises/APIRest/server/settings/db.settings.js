import dbsettings from './mongodb.settings.json';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    host: dbsettings.host,
    port: dbsettings.port,
    db: dbsettings.db
  };
} else if (process.env.NODE_ENV === 'test') {
  module.exports = {
    host: dbsettings.tests_host,
    port: dbsettings.tests_port,
    db: dbsettings.tests_db
  };
} else {
  module.exports = {
    host: dbsettings.dev_host,
    port: dbsettings.dev_port,
    db: dbsettings.dev_db
  };
}
