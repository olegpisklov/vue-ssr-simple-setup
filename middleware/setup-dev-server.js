module.exports = (app, publicPath) => {
    const webpack = require('webpack');
    const clientConfig = require('../config/webpack.client.config');
    const compiler = webpack(clientConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath,
        serverSideRender: true,
        logLevel: 'debug'
    }));

    app.use(require('webpack-hot-middleware')(compiler));
};