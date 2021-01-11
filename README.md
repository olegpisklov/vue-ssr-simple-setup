# Vue SSR Simple Setup

> [Medium article](https://medium.com/namecheap-engineering/production-ready-vue-ssr-in-5-simple-steps-39d171904150)

This repo is an example of SSR setup for Vue.js application using:
* _Webpack 4_ for building client and server bundles;
* _Node.js Express_ server;
* _webpack-dev-middleware_ and _webpack-hot-middleware_ for comfortable dev environment;
* _Babel_ for transpiling modern js syntax;
* _Vuex_ for a state management;
* _vue-meta_ for metadata management.

Feel free to use it as a boilerplate for your projects.

## Project setup
```
npm install
```

### Run Express dev server with HMR support
```
npm run dev
```

### Build client bundle for production
```
npm run build:client
```

### Build SSR bundle for production
```
npm run build:server
```
