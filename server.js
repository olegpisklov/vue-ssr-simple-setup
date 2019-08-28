const express = require('express');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('./middleware/setup-dev-server');

const port = 3000;
const app = express();
const publicPath = '/public';

app.use(publicPath,  express.static(path.resolve(__dirname, './dist')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, publicPath);
}

const indexPath = path.resolve(__dirname, 'index.html');
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