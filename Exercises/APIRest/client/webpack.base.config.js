const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('./package.json');
const { config, distDir } = require('./config');

const baseConfig = {
  output: {
    filename: `${distDir.jsDir}/bundle.[hash].js`,
    path: path.resolve(__dirname, config.distDir),
    publicPath: '/'
  },

  context: path.resolve(__dirname, config.srcDir),

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      {
        test: /\.(gif|png|jpg)$/,
        use: `file?name=${distDir.imgDir}/[name]-[hash].[ext]` // inline base64 URLs for <=10kb images, direct URLs for the rest
      },

      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file?name=fonts/[name].[ext]'
      },

      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file?name=fonts/[name].[ext]'
      },

      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file?name=fonts/[name].[ext]'
      },

      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file?name=fonts/[name].[ext]'
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file?name=fonts/[name].[ext]'
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg,
      template: '!!ejs-loader!' + path.join(__dirname, 'src', 'index.html')
    }),
  ],

  resolve: {
    alias: {
      // '~store': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'store')),
      // '~components': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'components')),
      // '~apollo': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'apollo')),
      // '~graphql': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'graphql')),
      // '~utils': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'utils')),
      // '~wsclient': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'wsclient')),
      // '~locale': path.resolve(__dirname, path.join(config.srcDir, config.appDir, 'common', 'locale')),
      // '~lib': path.resolve(__dirname, path.join(config.srcDir, 'lib')),
      '~config': path.resolve(__dirname, path.join('config'))
    }
  }
};

module.exports = baseConfig;
