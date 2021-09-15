const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
	return {
		mode: 'production',
		entry: ['./src/index.tsx'], //'@babel/polyfill',
		output: {
			// 打包文件根目录
			path: path.resolve(__dirname, 'dist/'),
			filename: 'index.js',
			library: 'ReactOnline', // 指定类库名,主要用于直接引用的方式
			libraryTarget: 'umd', //定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
		},
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
		},
		plugins: [
			new uglify(),
			new CleanWebpackPlugin(),
			new copyWebpackPlugin({
				patterns: [{ from: 'src/index.d.ts' }],
			}),
		],
		module: {
			rules: [
				{
					test: /\.(ts|tsx)?$/,
					use: ['babel-loader'],
					include: path.resolve(__dirname, 'src'),
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			plugins: [],
		},
	};
};
