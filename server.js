const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const vueServerRenderer = require('vue-server-renderer');
const webpack = require('webpack');

const clientConfig = require('./config/webpack.client.config');
const compiler = webpack(clientConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    serverSideRender: true,
    logLevel: 'silent',
});
const port = 3000;

// serve webpack bundle output
app.use(devMiddleware);

const renderer = vueServerRenderer.createBundleRenderer(
    require('./dist/vue-ssr-server-bundle.json'),
    {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    }
);

app.get('/', async (req, res) => {
    const context = {
        url: req.subRoute || '/',
    };
    const html = await renderer.renderToString(context);

    res.end(html);
});

app.listen(port, () => console.log(`Listening on: ${port}`));