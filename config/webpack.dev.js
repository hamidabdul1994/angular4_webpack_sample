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
  var buildPath = helpers.root(`dist/${appName}`);
  console.log(buildPath);
  // https://github.com/webpack/webpack-dev-server/issues/670
  return webpackMerge(commonConfig(appName), {
              devtool: 'source-map',
              output: {
        		    path: buildPath,
                publicPath: '',
                filename: '[name].js',
                chunkFilename: '[id].chunk.js'
              },

              plugins: [
                new ExtractTextPlugin('[name].css', {
                  allChunks : true
                }),
                new webpack.DefinePlugin({
                  'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'APP_CONFIG': JSON.stringify(APP_CONFIG)
                  }
                })
              ],
              devServer: {
                contentBase: buildPath,
                historyApiFallback: true,
                stats: 'minimal'
              }
          });
}
