<template>
    <v-app>
        <v-navigation-drawer v-if="status.loggedIn"
                             :mini-variant="miniVariant"
                             clipped="clipped"
                             v-model="drawer"
                             enable-resize-watcher
                             color="primary"
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
                            <v-list-tile-title>{{this.accountInfo.name}}</v-list-tile-title>
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
                    <v-list-tile-content color="white">
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app :clipped-left="clipped" dark color="primary">
            <v-toolbar-side-icon
                    v-if="status.loggedIn"
                    @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-toolbar-items class="hidden-sm-and-down">
                <NotificacaoBadge></NotificacaoBadge>
            </v-toolbar-items>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
            <v-alert transition="fade-transition"
                     :value="true"
                     :type="alert.message_type"
                     v-if="alert.message != null && alert.message_type != null"
                     dismissible>
                {{alert.message}}
            </v-alert>

            <router-view/>
        </v-content>
        <!--<v-footer :fixed="fixed" app>-->
        <!--<span>&copy; 2018</span>-->
        <!--</v-footer>-->
    </v-app>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import NotificacaoBadge from './views/NotificacaoBadge.vue';

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
        // {
        //     icon: 'settings_system_daydream',
        //     title: 'Sistemas',
        //     to: "/sistema"
        // },
        // {
        //     icon: 'chat',
        //     title: 'Mensagens',
        //     to: "/mensagem"
        // },
        // {
        //     icon: 'account_circle',
        //     title: 'Contas',
        //     to: "/conta"
        // },
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
  watch: {
    $route(to, from) {
      // clear alert on location change

      // const publicPages = [
      //   'login',
      //   'cadastrar'
      // ];
      //
      // const authRequired = !publicPages.includes(to.path);
      //
      // console.log(from);

      // if (to !== from) {
      //   this.clearAlert();
      // }
    },
  },
  mounted() {
  },
  components: {
    NotificacaoBadge,
  },

};
</script>
