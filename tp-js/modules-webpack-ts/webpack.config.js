const webpack = require("webpack");
const path = require("path");
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");//for webpack4

//entry: "./src/index.js" ou entry: "./src/main.js" ou ...
let config = {
  mode: 'production',
  entry: "./dist/out-tsc/htmlGraph.js",
  output: {
    path: path.resolve(__dirname, "./dist/build"),
    filename: "./main-bundle.js"
  },/*
    module: {
        rules: [{
            test: /\.js/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
				options: {
				  presets: ['@babel/preset-env']
				}
            }]
        },
		{
			test: /\.css$/,
			use:  ['style-loader' , MiniCssExtractPlugin.loader, 'css-loader' ]
		} ,
		{
			test: /\.scss$/,
			use:  ['style-loader' , MiniCssExtractPlugin.loader, 'css-loader' , 'sass-loader']
		}
		]
    },
      plugins: [
        new MiniCssExtractPlugin({ filename: 'styles-bundle.css'})
      ]
	  */
}

module.exports = config;