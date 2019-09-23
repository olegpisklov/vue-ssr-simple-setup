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

// you may want to serve static files with nginx or CDN in production
app.use('/public',  express.static(path.resolve(__dirname, './dist')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    renderer = createRenderer(require('./dist/vue-ssr-server-bundle.json'));
}

app.get(/^\/(about)?\/?$/, async (req, res) => {
    const context = {
        url: req.params['0'] || '/',
        state: {
            title: 'Vue SSR Simple Setup',
            users: []
        }
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (error) {
        if (error.code === 404) {
            return res.status(404).send('404 | Page Not Found');
        }
        return res.status(500).send('500 | Internal Server Error');
    }

    res.end(html);
});

// the endpoint for 'serverPrefetch' demonstration
app.get('/users', (req, res) => {
    res.json([{
            name: 'Albert',
            lastname: 'Einstein'
        }, {
            name: 'Isaac',
            lastname: 'Newton'
        }, {
            name: 'Marie',
            lastname: 'Curie'
        }]
    );
});

app.listen(port, () => console.log(`Listening on: ${port}`));