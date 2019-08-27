import { createApp } from './app';

const { app, router } = createApp();

import './assets/style.scss';

router.onReady(() => {
    app.$mount('#app');
});