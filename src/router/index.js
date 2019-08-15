// router.js
import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: App,
                name: 'app'
            },
        ]
    });
};