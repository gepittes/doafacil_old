<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <template v-if="status.loggedIn">
            <barra-lateral v-model="drawer"/>
        </template>

        <v-app-bar :clipped-left="clipped" app dark class="gradient-doafacil-bg" grid-list-md text-xs-center>
            <v-app-bar-nav-icon v-if="status.loggedIn" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-img :max-width="100" :src="logo"/>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="!status.loggedIn">
                <v-btn @click="$vuetify.goTo('#sobre', options)" text>Quem somos</v-btn>
                <v-btn to="/login" text>
                    <v-icon>fa fa-sign-in-alt mr-2</v-icon>
                    Login
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="pa-1" v-if="status.loggedIn">
                <v-menu transition="fade-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <v-avatar>
                                <i class="material-icons">account_circle</i>
                            </v-avatar>
                            <v-list-item-content text>
                                <v-list-item-title text>{{ accountInfo.name }}</v-list-item-title>
                            </v-list-item-content>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop to="/logout">
                            <v-list-item-title>Sair</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>

        <v-content max-width>
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

    import BarraLateral from './modules/core/BarraLateral';
    import Alerta from './modules/alert/Alerta.vue';

    export default {
        name: 'App',
        components: {
            BarraLateral,
            Alerta
        },
        data() {
            return {
                loading: false,
                clipped: false,
                drawer: true,
                fixed: false,
                miniVariant: false,
                right: true,
                rightDrawer: false,
                logo: require('@/assets/doafacil/logos/logo-doafacil-bg-white.png')
            };
        },

        computed: {
            options() {
                return {
                    duration: 1300,
                    offset: 0,
                    easing: 'easeInOutCubic',
                };
            },
            ...mapState({
                alert: state => state.alert
                // isLoggedIn: state => state.isLoggedIn
                // status: state => state.status
            }),
            ...mapGetters({
                status: 'account/status',
                user: 'account/user',
                accountInfo: 'account/accountInfo'
            })
        },
        mounted() {
            this.loading = true;
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            })
        }
    };
</script>
