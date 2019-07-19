<template>
    <v-app>
        <barra-lateral v-model="drawer"/>
        <v-toolbar
                :clipped-left="clipped"
                app
                dark
                color="#00b5dd">

            <v-toolbar-side-icon
                    v-if="status.loggedIn"
                    @click.stop="drawer = !drawer"/>
            <v-toolbar-title/>
            <v-img
                    :max-width="100"
                    :src="logo"
                    :color="white"
            />
        </v-toolbar>

        <v-content>
            <alerta
                    v-if="alert.message != null && alert.message_type != null"
                    :color="alert.message_type"
            >{{ alert.message }}
            </alerta>
            <router-view/>
        </v-content>

    </v-app>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex';
    import BarraLateral from './modules/core/BarraLateral.vue';
    import Alerta from './modules/alert/Alerta.vue';

    export default {
        name: 'App',
        components: {
            BarraLateral,
            Alerta,
        },
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
                    {
                        icon: 'home',
                        title: 'Instituições',
                        to: '/instituicoes',
                    },
                    {
                        icon: 'edit',
                        title: 'Administração',
                        to: '/administracao',
                    },

                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                logo: require('../src/assets/doafacil/logo-doafacil.png')
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
        mounted() {
            this.loading = true;
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear',
            }),
        },
    };
</script>
