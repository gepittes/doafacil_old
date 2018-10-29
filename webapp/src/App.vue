<template>
    <v-app>
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
        </div>
        <router-view/>
        <v-navigation-drawer persistent
                             :mini-variant="miniVariant"
                             clipped="clipped"
                             v-model="drawer"
                             enable-resize-watcher
                             fixed
                             dark
                             app>
            <v-list>
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
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <router-view/>
        </v-content>
        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2018</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>

    import {mapState, mapActions} from 'vuex'

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
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Notification WebApp'
            };
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                isLoggedIn: state => state.isLoggedIn
            })
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            })
        },
        watch: {
            $route(to, from) {
                // clear alert on location change
                this.clearAlert();
            }
        }
    }
</script>
