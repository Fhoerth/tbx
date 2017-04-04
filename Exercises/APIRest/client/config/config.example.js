const config = {
  srcDir: 'src',
  appDir: 'app',
  entryScript: 'index.js',
  devPort: 9100,
  prodPort: 8080,
  distDir: '.www',
  cacheDir: '.cache'
};

const testEnv = {};

const prodEnv = {};

const cacheDir = {
  dllDir: '.dll',
  happyPack: '.happy'
};

const distDir = {
  imgDir: 'images',
  stylesDir: 'styles',
  jsDir: 'js'
};

const api = {
  protocol: 'http',
  host: 'localhost',
  port: '8000',
  endPoint: 'api'
};

module.exports = {
  api, config, cacheDir, distDir, testEnv, prodEnv
};
