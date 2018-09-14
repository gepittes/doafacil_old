import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WebSocket from './views/WebSocket.vue';
import Plataforma from './views/Plataforma.vue';
import PlataformaDatatable from './views/PlataformaDatatable.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: WebSocket,
    },
    {
      path: '/plataforma',
      name: 'plataforma',
      component: Plataforma,
    },
    {
      path: '/plataformaDatatable',
      name: 'plataformaDatatable',
      component: PlataformaDatatable,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
