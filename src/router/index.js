import Vue from 'vue';
import Router from 'vue-router';
import About from '../modules/about/index.vue';
import Home from '../modules/home/index.vue';

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: Home,
                name: 'home'
            },
            {
                path: '/about',
                component: About,
                name: 'about'
            },
        ]
    });
};
