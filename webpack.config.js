const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const parentDir = path.join(__dirname, '/');
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    entry: {
        'build': parentDir + 'src/index.jsx'
    },
    output: {
        path: parentDir + "/dist",
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
};