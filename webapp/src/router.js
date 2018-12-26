import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Cadastrar from './views/Cadastrar.vue';
import Home from './views/Home.vue';
import WebSocket from './views/WebSocket.vue';
import Plataforma from './views/Plataforma.vue';
import NaoEncontrado from './views/NaoEncontrado.vue';
import Sistema from './views/Sistema.vue';
import Conta from './views/Conta.vue';
import Mensagem from './views/Mensagem.vue';
import Administracao from './views/Administracao.vue';
import store from './store';

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
    name: 'home',
  },
  {
    path: '/websocket',
    component: WebSocket,
  },
  {
    path: '/sobre',
    component: () => import(/* webpackChunkName: "about" */ './views/Sobre.vue'),
  },
  {
    path: '/administracao',
    component: Administracao,
    children: [
      {
        path: '/plataforma',
        component: Plataforma,
        name: Plataforma,
        meta: {
          title: 'Plataformas',
        },
      },
      {
        path: '/sistema',
        component: Sistema,
        name: Sistema,
        meta: {
          title: 'Sistema',
        },
      },
      {
        path: '/conta',
        component: Conta,
        name: Conta,
        meta: {
          title: 'Conta',
        },
      },
      {
        path: '/mensagem',
        component: Mensagem,
        name: Mensagem,
        meta: {
          title: 'Mensagem',
        },
      },
    ],
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
    '/cadastrar',
  ];

  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (to.path === '/logout') {
    store.dispatch('alert/info', 'Logout realizado som sucesso.', { root: true });
    return next('/login');
  }
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
