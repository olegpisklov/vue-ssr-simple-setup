const express = require('express');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('./config/setup-dev-server');

const port = 3000;
const app = express();

const createRenderer = (bundle) =>
    vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    });

let renderer;

app.use('/public',  express.static(path.resolve(__dirname, './dist')));


if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    createRenderer(require('./dist/vue-ssr-server-bundle.json'));
}

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