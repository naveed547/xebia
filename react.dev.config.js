// <reference types="webpack-env" />
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: ['react', 'react-dom', './src/index.tsx'],
	devtool: 'inline-source-map',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'distr'),
		publicPath: '/',
	},
	plugins: [
		new CleanWebpackPlugin(['./dist', './distr']),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [{
			test: /\.(scss|css)$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		},
		{
			test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
			exclude: /icons/,
			use: ['file-loader'],
		},
		{
			test: /\.svg(\?\S*)?$/,
			use: ['file-loader'],
		},
		{
			test: /\.(gif|jpg|png|ico)(\?\S*)?$/,
			use: ['url-loader'],
		},
		{ test: /\.(js|jsx|mjs)$/, loader: 'babel-loader', exclude: /node_modules/ },
		{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader',
		}],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json', '/index.tsx', '/index.ts', '.jsx'],
		alias: {
			Components: path.resolve(__dirname, 'src/components'),
			Containers: path.resolve(__dirname, 'src/containers'),
			Styles: path.resolve(__dirname, 'src/styles'),
			Api: path.resolve(__dirname, 'src/api'),
		},
	},
	devServer: {
		historyApiFallback: true,
		open: 'chrome',
	},
};
