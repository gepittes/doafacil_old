<template>
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
</template>

<script>

  import {mapGetters} from 'vuex';

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
      ...mapGetters({
        status: 'account/status',
        user: 'account/user',
        accountInfo: 'account/accountInfo',
      }),
    },

  };
</script>
