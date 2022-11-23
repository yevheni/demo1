const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const minimist = require("minimist");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const argv = minimist(process.argv);

const mode = argv.mode || "development";

const sourceDir = path.join(__dirname, `src`);
const distDir = path.join(__dirname, `dist`);

const envPath = path.join(__dirname, ".env");
const config = require("dotenv").config({
	path: envPath
}).parsed;

/** Web Config */
module.exports = {
	mode: mode,
	target: "web",
	devtool: mode === "development" ? "eval-source-map" : false,
	entry: {
		"index": path.join(sourceDir, `index.ts`),
	},
	output: {
		path: distDir,
		filename: `assets/js/[name].js`,
		chunkFilename: `assets/js/[name].js`,
		publicPath: `/`,
		clean: true,
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
		hot: false,
	},
	stats: {
		preset: "errors-warnings",
		colors: true,
		timings: true,
	},
	performance: {
		maxEntrypointSize: 1024 * 1000,
		maxAssetSize: 512 * 1000,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			vue: `vue/dist/vue.esm-bundler.js`
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						configFile: path.join(__dirname, `babel.config.js`),
					}
				}
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				exclude: /node_modules/,
				type: 'asset/resource',
				generator: {
					filename: "assets/img/[base]?h=[contenthash]",
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					mode === "development" ? {
						loader: 'style-loader',
						options: {}
					} : {
						loader: MiniCssExtractPlugin.loader,
						options: {}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								fiber: false,
							},
						}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.join(sourceDir, `partials.scss`),
							]
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true,
					}
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
			"process.env": {
				config: JSON.stringify(config),
			}
		}),
		new MiniCssExtractPlugin({
			filename: "assets/css/index.css",
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			hash: true,
			inject: "body",
			// favicon: "src/assets/img/favicon.png",
		}),
	],
};
