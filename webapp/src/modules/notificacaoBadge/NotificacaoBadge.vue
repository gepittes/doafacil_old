<template>

    <v-scale-transition>
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
                    <span slot="badge">{{this.notificacoesBadge.length}}</span>
                    <v-icon dark
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

                    <v-list-tile v-for="(minhaNotificacao, indexNotificacao) in this.notificacoesBadge"
                                 :key="indexNotificacao"
                                 v-if="indexNotificacao < 4 && minhaNotificacao.is_notificacao_lida == false"
                                 :to="minhaNotificacao">

                        <v-list-tile-content @click="lerNotificacao(minhaNotificacao)">
                            <!--<v-list-tile-title>John Leider</v-list-tile-title>-->
                            <v-list-tile-title>{{minhaNotificacao.titulo}}</v-list-tile-title>
                            <!--<v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>-->
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <!--<v-btn -->
                            <!--icon>-->
                            <v-icon>check</v-icon>
                            <!--</v-btn>-->
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title light>
                                <span class="headline">Todas Notificações</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-data-table light
                                                          :headers="headersBadge"
                                                          :items="this.notificacoesBadge"
                                                          :search="modeloBuscarBadge"
                                                          :rows-per-page-items="[ 10, 25, 40 ]"
                                                          :rows-per-page-text="'Registros por página'"
                                                          class="elevation-1">
                                                <template slot="items" slot-scope="props">
                                                    <td class="text-xs-center">{{ props.item.titulo }}</td>
                                                    <td class="text-xs-center">{{ props.item.data_envio | formatDate
                                                        }}
                                                    </td>
                                                    <td class="text-xs-center">
                                                        <v-icon v-if="props.item.is_notificacao_lida">thumb_up</v-icon>
                                                        <v-icon v-if="!props.item.is_notificacao_lida">thumb_down
                                                        </v-icon>
                                                    </td>
                                                </template>
                                            </v-data-table>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click.native="closeBadgeDialog">Fechar</v-btn>
                                <!--<v-btn v-if="!loading && exibirBotaoGravar" color="blue darken-1" @click.native="save">Gravar</v-btn>-->
                            </v-card-actions>
                        </v-card>
                        <!--<v-btn color="blue"-->
                        <!--slot="activator"-->
                        <!--fab small>-->
                        <!--<v-icon>add</v-icon>-->
                        <!--</v-btn>-->
                        <v-btn slot="activator" color="primary" flat>Visualizars todas</v-btn>
                    </v-dialog>
                </v-card-actions>
            </v-card>
        </v-menu>
    </v-scale-transition>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'NotificacaoBadge',
    data() {
      return {
        dialog: false,
        modeloBuscarBadge: '',
        headersBadge: [
          {
            text: 'Mensagem',
            value: 'titulo',
            align: 'center',
          },
          {
            text: 'Data',
            value: 'data_envio',
            align: 'center',
          },
          {
            text: 'Notificação Lida',
            value: 'is_notificacao_lida',
            align: 'center',
          },
        ],
        // temp
        fav: true,
        menu: false,
        message: false,
        hints: true,
        websocket: {
          connection: null,
        },
      };
    },
    computed: {
      ...mapGetters({
        notificacoes: 'notificacao/notificacoes',
        notificacoesBadge: 'notificacaoBadge/notificacoesBadge',
        accountInfo: 'account/accountInfo',
      }),
    },
    methods: {
      ...mapActions({
        obterNotificacoesUsuario: 'notificacaoBadge/obterNotificacoesUsuario',
        lerNotificacao: 'notificacaoBadge/lerNotificacao',
      }),
      closeBadgeDialog() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },
    },
    mounted() {
      this.websocket.connection = new WebSocket(`ws://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}`);

      this.websocket.connection.onopen = function (e) {
        console.log('Conexão estabelecida');
        console.log(e);
      };

      this.websocket.connection.onmessage = function (e) {
        console.log(e.data);
        this.obterNotificacoesUsuario(this.accountInfo.user_id);
      };

      if (this.notificacoesBadge.length == null || this.notificacoesBadge.length === 0) {
        this.obterNotificacoesUsuario(this.accountInfo.user_id);
      }
    },
    watch: {
      notificacoes(value) {
        if (this.notificacoes.length !== this.notificacoesBadge.length) {
          this.obterNotificacoesUsuario(this.accountInfo.user_id);
        }
      },
      dialog(val) {
        val || this.closeBadgeDialog();
      },
    },
  };
</script>

<style scoped>

</style>
