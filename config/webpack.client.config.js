const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const srcPath = path.resolve(process.cwd(), 'src');

module.exports = {
    entry: {
        app: path.join(srcPath, 'client-entry.js')
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/',
        filename: isProduction ? '[name].[hash].js' : '[name].js',
        sourceMapFilename: isProduction ? '[name].[hash].js.map' : '[name].js.map',
    },

    mode: "development",
    resolve: {
        alias: {
            '@': path.join(srcPath, 'client-entry.js')
        },
        extensions: ['.js', '.vue'],
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ srcPath ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ srcPath ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: !isProduction } }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[hash:7].[ext]',
                            context: srcPath
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name].[hash:7].[ext]',
                            publicPath: '/'
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ],

    devServer: {
        publicPath: '/',
        contentBase:  path.resolve(process.cwd(), '/dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        port: 8000,
        stats: {
            normal: true
        }
    }
};