const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { concat } = require('ramda');

const deepmerge = require('deepmerge');
const { config, distDir } = require('./config');

const baseConfig = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodWebpackConfig = deepmerge(
  baseConfig,
  {
    entry: {
      app: [
        './' + path.join(config.appDir, config.entryScript)
      ]
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            // fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            // fallbackLoader: 'style-loader',
            loader: 'css-loader!autoprefixer-loader!sass-loader'
          })
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerPort: 8888,
      //   reportFilename: 'report.html',
      //   openAnalyzer: true,
      //   generateStatsFile: false,
      //   statsFilename: 'stats.json',
      //   statsOptions: null,
      //   logLevel: 'info'
      // }),

      new ExtractTextPlugin(`${distDir.stylesDir}/styles.[hash].css`),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  },
  { arrayMerge: concat }
);

module.exports = prodWebpackConfig;
