const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

const srcPath = path.resolve(process.cwd(), 'src');

module.exports = {
    // Point entry to your app's server entry file
    entry: path.join(srcPath, 'server-entry.js'),

    // This allows webpack to handle dynamic imports in a Node-appropriate
    // fashion, and also tells `vue-loader` to emit server-oriented code when
    // compiling Vue components.
    target: 'node',

    // For bundle renderer source map support
    devtool: 'source-map',
    mode: "development",
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

    // This tells the server bundle to use Node-style exports
    output: {
        libraryTarget: 'commonjs2'
    },

    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // Externalize app dependencies. This makes the server build much faster
    // and generates a smaller bundle file.
    externals: nodeExternals({
        // do not externalize dependencies that need to be processed by webpack.
        // you can add more file types here e.g. raw *.vue files
        // you should also whitelist deps that modifies `global` (e.g. polyfills)
        whitelist: /\.css$/
    }),

    // This is the plugin that turns the entire output of the server build
    // into a single JSON file. The default file name will be
    // `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        new VueLoaderPlugin(),
    ]
};