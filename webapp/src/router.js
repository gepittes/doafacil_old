import Vue from 'vue';
import Router from 'vue-router';
import Login from './modules/conta/Login.vue';
import Instituicoes from './views/Instituicao/Instituicoes.vue';
import PerfilInstituicao from './views/Instituicao/Perfil.vue';
import Cadastrar from './modules/conta/Cadastrar.vue';
import Administracao from './modules/core/Administracao.vue';
import Pontos from './views/ponto/Pontos.vue';
import PontoPerfil from './views/ponto/Perfil.vue';
import Home from './views/home/Home.vue';
import NaoEncontrado from './modules/core/NaoEncontrado.vue';
import Conta from './modules/conta/Conta.vue';
import Configuracao from './modules/core/Configuracao.vue';
import store from './store';
import Main from './views/Main.vue';
import { obterInformacoesJWT } from './modules/account/_helpers/jwt';
import Eventos from "./views/evento/Eventos";

Vue.use(Router);

const routesObject = [
    {
        path: '/instituicao/:id',
        component: PerfilInstituicao,
        props: true,
        meta: {
            title: 'perfil',
            layout: 'no-side-bar',
        },
    },
    {
        path: '/main',
        component: Main,
        meta: {
            title: 'Principal',
        },
    },
    {
        path: '/ponto/:id',
        component: PontoPerfil,
        name: 'pontoPerfil',
        props: true,
    },
    {
        path: '/pontos',
        component: Pontos,
        meta: {
            title: 'Principal',
        },
    },
    {
        path: '/eventos',
        component: Eventos,
        meta: {
            title: 'Eventos'
        }
    },
    {
        path: '/instituicoes',
        component: Instituicoes,
        name: 'instituicoes',
        meta: {
            title: 'instituicoes',
        },
    },
    {
        path: '/login',
        component: Login,
        meta: { layout: 'no-side-bar' },
    },
    {
        path: '/cadastrar',
        component: Cadastrar,
        meta: { layout: 'no-side-bar' },
    },
    {
        path: '*',
        component: NaoEncontrado,
        meta: { layout: 'no-side-bar' },
    },
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: { layout: 'no-side-bar' },
    },
    {
        path: '/configuracao',
        component: Configuracao,
        name: 'configuracao',
    },
    {
        path: '/administracao',
        component: Administracao,
        redirect: '/administracao/conta',
        children: [
            {
                path: '/administracao/conta',
                component: Conta,
                name: Conta,
                meta: {
                    title: 'Conta',
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
        '/instituicaes',
        '/sobre',
        '/',
    ];

    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (to.path === '/logout') {
        store.dispatch('alert/info', 'Logout realizado com sucesso.', { root: true });
        return next('/login');
    }

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    try {
        obterInformacoesJWT();

        return next();
    } catch (Exception) {
        localStorage.removeItem('token');
        store.dispatch('alert/error', `Erro: ${Exception}`, { root: true });
        return next('/login');
    }
});

export default router;
