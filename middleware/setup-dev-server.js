module.exports = (publicPath) => {
    const webpack = require('webpack');
    const clientConfig = require('../config/webpack.client.config');
    const compiler = webpack(clientConfig);

    return  require('webpack-dev-middleware')(compiler, {
        publicPath,
        serverSideRender: true,
        logLevel: 'debug'
    });
};