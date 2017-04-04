import serverSettings from './settings/server.settings';

let server = null;

export const closeServer = () => {
  server.close();
};

export const createServer = async (app) => {

  try {
    server = app.listen(serverSettings.port, () => {
      console.log(`Server is currently running on port ${serverSettings.port}`);
    });

    process.on('exit', function () {
      closeServer();
    });

    process.on('SIGINT', function () {
      console.log('\nCtrl+C, closing db.');
      closeServer();
    });

    return server;

  } catch (e) {
    console.error(e.stack);
  }

};

export default createServer;
