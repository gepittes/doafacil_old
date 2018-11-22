<template>
    <v-app>
        <v-navigation-drawer v-if="status.loggedIn"
                             :mini-variant="miniVariant"
                             clipped="clipped"
                             v-model="drawer"
                             enable-resize-watcher

                             temporary
                             app>
            <v-list class="pa-1">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <!--<img src="https://randomuser.me/api/portraits/men/85.jpg">-->
                        <i class="material-icons">
                            account_circle
                        </i>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{this.userInformation.name}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon @click.stop="drawer = !drawer">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0">
                <v-divider></v-divider>

                <v-list-tile value="true"
                             v-for="(item, i) in items"
                             :key="i"
                             :to="item.to">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app :clipped-left="clipped">
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
                        icon: 'bubble_chart',
                        title: 'Hello!',
                        to: "/"
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'WebSocket',
                        to: "/websocket"
                    },
                    {
                        icon: 'devices',
                        title: 'Plataforma',
                        to: "/plataforma"
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Sobre',
                        to: "/about"
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Sair',
                        to: "/login"
                    },
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Notification WebApp',
                // isLoggedIn: localStorage.getItem('user')
                userInformation: {}
            };
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                // isLoggedIn: state => state.isLoggedIn
                // status: state => state.status
            }),
            ...mapGetters({
                status: 'account/status'
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
            }
        },
        mounted() {
            this.getJWTInformation().then(result => {
                this.userInformation = result.user
            });
        }

    }
</script>
