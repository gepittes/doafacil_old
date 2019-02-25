<template>
    <v-app>
        <barra-lateral v-model="drawer"/>
        <v-toolbar
            :clipped-left="clipped"
            app
            dark
            color="primary">
            <v-toolbar-side-icon
                v-if="status.loggedIn"
                @click.stop="drawer = !drawer"/>
            <v-toolbar-title v-text="title"/>
            <notificacao-badge
                v-show="loading"
                v-if="status.loggedIn"/>
            <v-spacer/>
        </v-toolbar>

        <v-content>
            <alerta
                v-if="alert.message != null && alert.message_type != null"
                :color="alert.message_type"
            >{{ alert.message }}</alerta>
            <router-view/>
        </v-content>
        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2018</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import NotificacaoBadge from './modules/notificacaoBadge/NotificacaoBadge.vue';
import BarraLateral from './modules/core/BarraLateral.vue';
import Alerta from './modules/alert/Alerta.vue';

export default {
    name: 'App',
    data() {
        return {
            loading: false,
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'home',
                    title: 'Início',
                    to: '/',
                },
                // {
                //   icon: 'chat',
                //   title: 'Chat Interno',
                //   to: '/websocket',
                // },
                {
                    icon: 'chat',
                    title: 'Notificacao',
                    to: '/notificacao',
                },
                {
                    icon: 'edit',
                    title: 'Administração',
                    to: '/administracao',
                },
                {
                    icon: 'info',
                    title: 'Sobre',
                    to: '/sobre',
                },
                {
                    icon: 'chat',
                    title: '(Teste) Chat/WebSocket',
                    to: '/websocket',
                },
                {
                    icon: 'exit_to_app',
                    title: 'Sair',
                    to: '/logout',
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Notification WebApp',
        };
    },
    computed: {
        ...mapState({
            alert: state => state.alert,
            // isLoggedIn: state => state.isLoggedIn
            // status: state => state.status
        }),
        ...mapGetters({
            status: 'account/status',
            user: 'account/user',
            accountInfo: 'account/accountInfo',
        }),
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear',
        }),
    },
    mounted() {
        this.loading = true;
    },
    components: {
        NotificacaoBadge,
        BarraLateral,
        Alerta,
    },

};
</script>
