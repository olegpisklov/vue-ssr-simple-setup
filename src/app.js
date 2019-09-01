import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import {createRouter} from './router';
import createStore from './store';

Vue.use(Vuex);

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