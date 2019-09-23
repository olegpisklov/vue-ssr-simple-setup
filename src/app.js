import Vue from 'vue';
import Vuex from 'vuex';
import Meta from 'vue-meta'
import App from './App.vue';
import {createRouter} from './router';
import createStore from './store';

Vue.use(Vuex);
Vue.use(Meta, {
    ssrAppId: 1 // https://vue-meta.nuxtjs.org/guide/caveats.html#duplicated-tags-after-hydration-with-ssr
});

export const createApp = (context) =>  {
    const router = createRouter();
    const store = createStore(context.state);

    const app = new Vue({
        store,
        router,
        render: h => h(App),
    });
    
    return {app, router, store};
};