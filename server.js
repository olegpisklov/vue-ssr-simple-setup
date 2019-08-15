const express = require('express');
const app = express();

const vueServerRenderer = require('vue-server-renderer');
const webpack = require('webpack');

const renderer = vueServerRenderer.createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {runInNewContext: false, template: ''});
const clientConfig = require('./config/webpack.client.config');
const compiler = webpack(clientConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    serverSideRender: true,
    logLevel: 'silent',
});

// serve webpack bundle output
// app.use(devMiddleware);

app.get('/', async (req, res) => {
    const context = {
        url: req.subRoute || '/',
    };
    const html = await renderer.renderToString(context);

    res.end(html);
});

app.listen(3000, () => console.log(`Listening on: 3000`));