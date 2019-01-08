<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat >
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Notificacões</v-toolbar-title>
                    <v-dialog v-model="dialog" max-width="500px" >
                        <v-card>
                            <v-card-title light>
                                <span class="headline">{{ formTitle }} Notificação</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-textarea
                                                    v-model="editedItem.codigo_destinatario"
                                                    label="Código Destinatário"
                                                    auto-grow
                                                    box
                                                    color="deep-purple"
                                                    required
                                                    :rules="[(object) => object.length > 3 || 'Campo obrigatório.']"
                                                    rows="5"></v-textarea>

                                            <v-select v-model="editedItem.mensagem_id"
                                                      :disabled="editedItem.notificacao_id != null"
                                                      :items="mensagensRenderizadas"
                                                      :rules="[v => !!v || 'Campo obrigatório']"
                                                      label="Mensagem"
                                                      box
                                                      item-text="descricao"
                                                      item-value="mensagem_id"
                                                      required></v-select>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click.native="close">Fechar</v-btn>
                                <v-btn v-if="!loading && exibirBotaoGravar"
                                       color="blue darken-1"
                                       @click.native="save">Gravar</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-btn color="blue"
                               slot="activator"
                               fab small>
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-dialog>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="modeloBuscar"
                            append-icon="search"
                            label="Buscar"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-toolbar>
                <v-card-text>
                    <v-data-table light
                                  :headers="headers"
                                  :items="notificacoesRenderizadas"
                                  :search="modeloBuscar"
                                  :rows-per-page-items="[ 10, 25, 40 ]"
                                  :rows-per-page-text="'Registros por página'"
                                  class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.notificacao_id }}</td>
                            <td class="text-xs-center">{{ props.item.codigo_destinatario }}</td>
                            <td class="text-xs-center">{{ props.item.mensagem.titulo }}</td>
                            <td class="text-xs-center">{{ props.item.data_envio | formatDate }}</td>
                            <td class="text-xs-center">{{ (props.item.is_notificacao_lida) ? 'Sim' :  'Não' }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon small
                                        class="mr-2"
                                        @click="editItem(props.item)">search
                                </v-icon>
                                <v-icon small
                                        @click="deleteItem(props.item)">delete
                                </v-icon>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-btn color="primary" @click="this.obterNotificacaos">Reset</v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: false,
    dialog: false,
    exibirBotaoGravar: true,
    modeloBuscar: '',
    headers: [
      {
        text: 'Identificador',
        align: 'center',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Código Destinatário',
        value: 'codigo_destinatario',
        align: 'center',
      },
      {
        text: 'Mensagem',
        value: 'mensagem.titulo',
        align: 'center',
      },
      {
        text: 'Data de envio',
        value: 'data_envio',
        align: 'center',
      },
      {
        text: 'Notificação Lida',
        value: 'is_notificacao_lida',
        align: 'center',
      },
      {
        text: 'Ação',
        value: 'acao',
        align: 'center',
        sortable: false,
      },
    ],
    notificacoesRenderizadas: [],
    mensagensRenderizadas: [],
    editedIndex: -1,
    editedItem: {
      notificacao_id: null,
      autor_id: null,
      mensagem_id: null,
      descricao: '',
      is_ativo: true,
      plataformas: [],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Criar' : 'Editar';
    },
    ...mapGetters({
      notificacoes: 'notificacao/notificacoes',
      mensagens: 'mensagem/mensagens',
      contas: 'conta/conta',
      plataformas: 'plataforma/plataforma',
      accountInfo: 'account/accountInfo',
    }),
  },

  watch: {
    dialog(val) {
      if (this.editedItem.autor_id == null) {
        this.editedItem.autor_id = this.accountInfo.user_id;
      }
      this.exibirBotaoGravar = true;
      if (this.editedItem.notificacao_id != null) {
        this.exibirBotaoGravar = false;
      }


      val || this.close();
    },
    notificacoes(value) {
      if ('error' in value) {
        alert(value.error);
        this.notificacoesRenderizadas = [];
      } else {
          this.notificacoesRenderizadas = value;
      }
console.log(value)
    },
    mensagens(value) {
      if ('error' in value) {
        this.mensagensRenderizadas = [];
      } else {
        this.mensagensRenderizadas = value;
      }
    },
    editedItem(value) {
      if (this.editedItem.autor_id == null) {
        this.editedItem.autor_id = this.accountInfo.user_id;
      }
    },
  },
  created() {

    // if(this.plataformas.length == null) {
    //     this.obterPlataformas();
    // }
  },
  mounted() {
    if (this.notificacoes.length == null || this.notificacoes.length === 0) {
      this.obterNotificacaos();
    }
    if (this.notificacoes.length > 0) {
      this.notificacoesRenderizadas = this.notificacoes;
    }
    if (this.mensagens.length == null || this.mensagens.length === 0) {
      this.obterMensagems();
    }
    if (this.mensagens.length > 0) {
      this.mensagensRenderizadas = this.mensagens;
    }
    if (this.contas.length == null || this.contas.length === 0) {
      this.obterContas();
    }
    if (this.plataformas.length == null || this.plataformas.length === 0) {
      this.obterPlataformas();
    }
  },
  // editedItem
  methods: {

    ...mapActions({
      obterMensagems: 'mensagem/obterMensagems',
      obterNotificacaos: 'notificacao/obterNotificacaos',
      obterContas: 'conta/obterContas',
      obterPlataformas: 'plataforma/obterPlataformas',
      removerNotificacao: 'notificacao/removerNotificacao',
      cadastrarNotificacao: 'notificacao/cadastrarNotificacao',
      atualizarNotificacao: 'notificacao/atualizarNotificacao',
    }),

    editItem(item) {
      this.editedIndex = this.notificacoes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm('Deseja remover esse item?')) {
        this.removerNotificacao(item.notificacao_id);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      const self = this;
      self.loading = true;

      if (self.editedIndex > -1) {
        this.atualizarNotificacao(self.editedItem);
      } else {
        console.log(self.editedItem);
        this.cadastrarNotificacao(self.editedItem);
      }
      self.close();
    },

  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
