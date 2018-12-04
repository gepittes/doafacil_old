<template>
    <v-app>
        <v-navigation-drawer v-if="status.loggedIn"
                             :mini-variant="miniVariant"
                             clipped="clipped"
                             v-model="drawer"
                             enable-resize-watcher
                             dark color="primary"
                             temporary
                             app>
            <v-card dark color="primary">
                <v-list class="pa-1">
                    <v-list-tile avatar tag="div">
                        <v-list-tile-avatar>
                            <i class="material-icons">
                                account_circle
                            </i>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{this.accountInformation.name}}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="drawer = !drawer">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
            <v-list class="pt-0">
                <v-divider></v-divider>

                <v-list-tile value="true"
                             v-for="(item, i) in items"
                             :key="i"
                             :to="item.to">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content dark color="white">
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app :clipped-left="clipped" dark color="primary">
            <v-toolbar-side-icon v-if="status.loggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <v-alert :value="true" type="error" v-if="alert.message != null && alert.type == 'alert-danger'">
                {{alert.message}}
            </v-alert>
            <!--<div id="nav">-->
            <!--<router-link to="/">Home</router-link>-->
            <!--|-->
            <!--<router-link to="/about">About</router-link>-->
            <!--<span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>-->
            <!--</div>-->

            <router-view/>
        </v-content>
        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2018</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    {
                        icon: 'home',
                        title: 'Início',
                        to: "/"
                    },
                    {
                        icon: 'chat',
                        title: 'Chat',
                        to: "/websocket"
                    },
                    {
                        icon: 'devices',
                        title: 'Plataformas',
                        to: "/plataforma"
                    },
                    {
                        icon: 'settings_system_daydream',
                        title: 'Sistemas',
                        to: "/sistema"
                    },
                    {
                        icon: 'chat',
                        title: 'Mensagens',
                        to: "/mensagem"
                    },
                    {
                        icon: 'account_circle',
                        title: 'Contas',
                        to: "/conta"
                    },
                    {
                        icon: 'info',
                        title: 'Sobre',
                        to: "/sobre"
                    },
                    {
                        icon: 'exit_to_app',
                        title: 'Sair',
                        to: "/login"
                    },
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Notification WebApp',
                // isLoggedIn: localStorage.getItem('user')
                accountInformation: {}
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
                user: 'account/user'
            }),
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear',
                getJWTInformation: 'account/getJWTInformation'
            })
        },
        watch: {
            $route(to, from) {
                // clear alert on location change
                this.clearAlert();
            },
            user() {
                let token = localStorage.getItem('user');
                this.getJWTInformation(token).then(result => {
                    this.accountInformation = result.user
                });
            }
        },
        mounted() {
            console.log(2)
        }

    }
</script>
