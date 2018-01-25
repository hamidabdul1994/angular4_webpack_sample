var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
const pathExists = require('path-exists');

function fileExist(entryPath) {
	if(!pathExists.sync(entryPath)){
    throw `Entry Path does not exist: ${entryPath}`
  }
}

module.exports = function(appName) {
			var entry = {
				'polyfills': `./src/${appName}/polyfills.ts`,
				'vendor': `./src/${appName}/vendor.ts`,
				'app': `./src/${appName}/main.ts`
			};
			//For checking file is exist or not
			for (var index in entry) {
				if (entry.hasOwnProperty(index)) {
					fileExist(entry[index]);
				}
			}

			return {
			entry: entry,
			resolve: {
				extensions: ['.ts', '.js']
			},

			module: {
				rules: [
					// angular2 typescript loader
					{
						test: /\.ts$/,
						use: [
							{
								loader: 'awesome-typescript-loader?useBabel=true&useWebpackText=true'
							},
							{
								loader: 'angular2-template-loader'
							},
							{
								loader: 'angular-router-loader'
							}
						]
					},
					// html loader
					{
						test: /\.html$/,
						loader: 'raw-loader',
						exclude: [helpers.root('src/index.html')]
					},
					// static assets
					{
						test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
						loader: 'file-loader?name=assets/[name].[hash].[ext]'
					},
					// css global which not include in components
					{
						test: /\.css$/,
						exclude: helpers.root('src', appName),
						use: ExtractTextPlugin.extract({
							use: "raw-loader"
						})
					},
					// css loader and inject into components
					{
						test: /\.css$/,
						include: helpers.root('src', appName),
						loader: 'raw-loader'
					},
					// SASS loader and inject into components
					{
						test: /\.scss$/,
						include: helpers.root('src', appName),
						use: ['raw-loader', 'sass-loader']
					},
					// SASS global which not include in components
					{
						test: /\.scss$/,
						exclude: helpers.root('src', appName),
						use: ExtractTextPlugin.extract({
							use: ['raw-loader', 'sass-loader']
						})

					}
				]
			},

			plugins: [
				new webpack.optimize.CommonsChunkPlugin({
					name: ['app', 'vendor', 'polyfills']
				}),

				new HtmlWebpackPlugin({
					template: 'src/index.html'
				}),

				new CopyWebpackPlugin([
					{ from: 'src/assets', to: 'assets' }
				]),

				new webpack.ProvidePlugin({
					jQuery: 'jquery',
					$: 'jquery',
					jquery: 'jquery'
				}),
				new webpack.ContextReplacementPlugin(
					/angular(\\|\/)core(\\|\/)@angular/,
					__dirname
				)
			]
		};
		//function end
	};
