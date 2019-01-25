<template>


    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x>
        <v-btn flat
               slot="activator"
               color="indigo"
               dark>
            <v-badge right color="red">
                <span slot="badge">{{this.notificacoes.length}}</span>
                <v-icon
                        dark
                        color="white darken-1">
                    notifications
                </v-icon>
            </v-badge>
        </v-btn>

        <v-card>
            <v-card-title>
                Notificações
            </v-card-title>

            <v-list>

                <v-list-tile v-for="(minhaNotificacao, indexNotificacao) in this.notificacoes"
                            :key="indexNotificacao"
                            :to="minhaNotificacao">

                    <v-list-tile-content @click="fav = !fav">
                        <v-list-tile-title>John Leider</v-list-tile-title>
                        <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click="fav = !fav">
                        <v-btn :class="fav ? 'red--text' : ''"
                                icon>
                            <v-icon>check</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" flat @click="menu = false">Marcar Todas como Lidas</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NotificacaoBadge',
  data() {
    return {
        quantidade_notificacoes: [],

      // temp
      fav: true,
      menu: false,
      message: false,
      hints: true
    };
  },
  computed: {
    ...mapGetters({
      notificacoes: 'notificacao/notificacoes',
    }),
  },
  methods: {
    ...mapActions({
      obterNotificacaos: 'notificacao/obterNotificacaos',
    }),
  },
  mounted() {
    if (this.notificacoes.length == null || this.notificacoes.length === 0) {
      this.obterNotificacaos();
    }
  },
};
</script>

<style scoped>

</style>
