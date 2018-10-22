import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import WebSocket from './views/WebSocket.vue';
import Plataforma from './views/Plataforma.vue';
import NaoEncontrado from './views/NaoEncontrado.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const routes = [
    {
      path: '/login',
      component: Login,
    },
    {
        path: '*',
        component: NaoEncontrado,
        // redirect: '/'
    },
    {
        path: '/',
        component: Home,
    },
    {
        path: '/websocket',
        component: WebSocket,
    },
    {
        path: '/plataforma',
        component: Plataforma,
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
];

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes,
});
//
// router.beforeEach((to, from, next) => {
//
//     const publicPages = [
//         '/login',
//         '/cadastrar'
//     ];
//
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');
//
//     if (authRequired && !loggedIn) {
//         return next('/login');
//     }
//
//     next();
// })
