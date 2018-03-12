const webpack = require('webpack');
const path = require('path');

module.exports = {
	devServer: {
		historyApiFallback: true
	},
	context: path.join(__dirname),
	entry: "./src/js/router.js",
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css?$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			}
		]
	},
	output: {
		path: __dirname,
		filename: "bundle.js"
	}
}