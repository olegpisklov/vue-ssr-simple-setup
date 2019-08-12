const express = require('express');
const app = express();

const vueServerRenderer = require('vue-server-renderer');

const renderer = vueServerRenderer.createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {runInNewContext: false, template: ''});

app.get('/', async (req, res) => {
    const context = {
        url: req.subRoute || '/',
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (e) {
        console.log(e);
    }

    console.log('HTML', html);

    res.end(html);
});

app.listen(3000, () => console.log(`Listening on: 3000`));