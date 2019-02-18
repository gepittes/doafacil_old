import Vue from 'vue';
import Router from 'vue-router';
import Login from './modules/conta/Login.vue';
import Cadastrar from './modules/conta/Cadastrar.vue';
import WebSocket from './modules/websocket/WebSocket.vue';
import Administracao from './modules/core/Administracao.vue';
import Home from './modules/core/Home.vue';
import NaoEncontrado from './modules/core/NaoEncontrado.vue';
import Sobre from './modules/core/Sobre.vue';
import Plataforma from './modules/plataforma/Plataforma.vue';
import Sistema from './modules/sistema/Sistema.vue';
import Conta from './modules/conta/Conta.vue';
import Mensagem from './modules/mensagem/Mensagem.vue';
import Notificacao from './modules/notificacao/Notificacao.vue';
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
    path: '/notificacao',
    component: Notificacao,
  },
  {
    path: '/sobre',
    component: Sobre,
  },
  {
    path: '/administracao',
    component: Administracao,
    redirect: '/administracao/plataforma',
    children: [
      {
        path: '/administracao/plataforma',
        component: Plataforma,
        name: Plataforma,
        meta: {
          title: 'Plataformas',
        },
      },
      {
        path: '/administracao/sistema',
        component: Sistema,
        name: Sistema,
        meta: {
          title: 'Sistema',
        },
      },
      {
        path: '/administracao/conta',
        component: Conta,
        name: Conta,
        meta: {
          title: 'Conta',
        },
      },
      {
        path: '/administracao/mensagem',
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
