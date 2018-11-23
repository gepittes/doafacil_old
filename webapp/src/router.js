import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Cadastrar from './views/Cadastrar.vue';
import Home from './views/Home.vue';
import WebSocket from './views/WebSocket.vue';
import Plataforma from './views/Plataforma.vue';
import NaoEncontrado from './views/NaoEncontrado.vue';
import Sistema from './views/Sistema.vue';

Vue.use(Router);

const routesObject = [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/cadastrar',
      component: Cadastrar,
    },
    {
        path: '*',
        component: NaoEncontrado,
        // redirect: '/'
    },
    {
        path: '/',
        component: Home,
        name: 'home'
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
        path: '/sistema',
        component: Sistema,
    },
    {
        path: '/about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routesObject,
});

router.beforeEach((to, from, next) => {

    const publicPages = [
        '/login',
        '/cadastrar'
    ];

    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;
