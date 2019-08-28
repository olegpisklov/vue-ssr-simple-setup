const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const vueServerRenderer = require('vue-server-renderer');
const webpack = require('webpack');

const clientConfig = require('./config/webpack.client.config');
const compiler = webpack(clientConfig);
const indexPath = path.resolve(__dirname, 'index.html');
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/public',
    serverSideRender: true,
    logLevel: 'debug'
});

const port = 3000;

app.use('/public',  express.static(path.resolve(__dirname, './dist')));

// serve webpack bundle output
app.use(devMiddleware);

const renderer = vueServerRenderer.createBundleRenderer(
    require('./dist/vue-ssr-server-bundle.json'),
    {
        runInNewContext: false,
        template: fs.readFileSync(indexPath, 'utf-8')
    }
);

app.get('/', async (req, res) => {
    const context = {
        url: req.subRoute || '/',
        state: {
            title: 'Vue SSR Simple Steps'
        }
    };
    const html = await renderer.renderToString(context);

    res.end(html);
});

app.listen(port, () => console.log(`Listening on: ${port}`));