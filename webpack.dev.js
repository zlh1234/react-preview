const path = require('path');
const HtmlWebpackPlugin = require('./node_modules/html-webpack-plugin');

module.exports = (env) => {
	return {
		mode: 'development',
		entry: ['./src/index.tsx'],
		output: {
			// 打包文件根目录
			path: path.resolve(__dirname, 'dist/'),
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './build/index.html',
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
		devServer: {
			port: 8080,
			host: '0.0.0.0',
			open: true,
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			plugins: [],
		},
	};
};
