var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const APP_CONFIG = {
  API_URL: 'dev.api.local'
};

module.exports = function(appName) {
  return webpackMerge(commonConfig(appName), {
              devtool: 'source-map',

              output: {
        		    path: helpers.root(`dist/${appName}`),
                publicPath: "",
                filename: '[name].js',
                chunkFilename: '[id].chunk.js'
              },

              plugins: [
                new ExtractTextPlugin('[name].css'),
                new webpack.DefinePlugin({
                  'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'APP_CONFIG': JSON.stringify(APP_CONFIG)
                  }
                })
              ],

              devServer: {
                historyApiFallback: true,
                stats: 'minimal'
              }
          });
}
