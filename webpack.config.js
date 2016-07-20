const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        admin: './frontend/src/admin',
        main: './frontend/src/main'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'js/[name].js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [ 'es2015', "stage-2" ],
                    plugins: [ "transform-runtime" ],
                    comments: false
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css', {
                    publicPath: '../'
                })
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=fonts/[hash].[ext]"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './frontend/template/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'admin/index.html',
            template: './frontend/template/admin.html',
            chunks: ['admin']
        })
    ],
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV == 'development') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                API_URL: `"${process.env.API_URL}"`
            }
        })
    ])
}

if (process.env.NODE_ENV == 'production') {
    module.exports.devtool = '#eval-source-map'
    // http://vuejs.github.io/vue-loader/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                API_URL: `"${process.env.API_URL}"`
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ])
}
