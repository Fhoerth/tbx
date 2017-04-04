const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { concat } = require('ramda');

const deepmerge = require('deepmerge');
const { config, cacheDir, distDir, graphQL, ws } = require('./config');

const baseConfig = require('./webpack.base.config.js');

const devWebpackConfigFactory = (locale = 'en-US') => deepmerge(
  baseConfig,
  {
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?http://localhost:9100',
      './' + path.join(config.appDir, config.entryScript)
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: 'style-loader!css-loader'
        },
        /** == .scss with SASS == **/
        {
          test: /\.scss$/,
          loaders: 'style-loader!css-loader?sourceMap!autoprefixer-loader!sass-loader?sourceMap'
        }
      ]
    },
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, config.distDir),
      publicPath: '/',
      historyApiFallback: {
        disableDotRule: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin(),

      // new AddAssetHtmlPlugin([{
      //   filepath: require.resolve(path.join(__dirname, config.cacheDir, cacheDir.dllDir, 'vendors.dll.js')),
      //   hash: true,
      //   outputPath: `${distDir.jsDir}`,
      //   includeSourcemap: false,
      //   publicPath: `/${distDir.jsDir}`
      // }]),

      // new webpack.DllReferencePlugin({
      //   context: process.cwd(),
      //   manifest: require(path.join(__dirname, config.cacheDir, cacheDir.dllDir, 'vendors.json'))
      // }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
          'LOCALE': JSON.stringify(locale)
        }
      })
    ]
  },
  { arrayMerge: concat }
);

module.exports = devWebpackConfigFactory;
