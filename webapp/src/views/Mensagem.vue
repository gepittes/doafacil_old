<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat dark>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Mensagens</v-toolbar-title>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }} Mensagem</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-text-field v-model="editedItem.titulo"
                                                          label="Título"
                                                          box
                                                          required></v-text-field>
                                            <v-text-field v-model="editedItem.descricao"
                                                          box
                                                          label="Descrição"
                                                          required></v-text-field>

                                            <li v-for="plataforma in this.plataformas">
                                                <v-checkbox disabled="plataformasSelecionadas.length < 1"
                                                            v-model="plataformasSelecionadas"
                                                            :label="plataforma.descricao"
                                                            color="success"
                                                            :value="plataforma.plataforma_id"></v-checkbox>
                                            </li>

                                            <v-select v-model="editedItem.sistema_id"
                                                      :disabled="editedItem.sistema_id != null"
                                                      :items="sistemasRenderizados"
                                                      :rules="[v => !!v || 'Campo obrigatório']"
                                                      label="Sistema"
                                                      box
                                                      item-text="descricao"
                                                      item-value="sistema_id"
                                                      required></v-select>

                                            <v-text-field disabled
                                                          :value="this.obterNomeAutor(editedItem.autor_id)"
                                                          v-if="plataformasSelecionadas.length > 0"
                                                          label="Autor"
                                                          box></v-text-field>

                                        </v-flex>
                                        <v-flex xs12 sm6 md12>
                                            <v-switch :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                                                      v-model="editedItem.is_ativo"></v-switch>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" @click.native="close">Fechar</v-btn>
                                <v-btn v-if="!loading && exibirBotaoGravar" color="blue darken-1" @click.native="save">Gravar
                                </v-btn>
                                <v-progress-circular v-if="loading"
                                                     indeterminate
                                                     color="primary"></v-progress-circular>
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
                                  :items="mensagensRenderizadas"
                                  :search="modeloBuscar"
                                  :rows-per-page-items="[ 10, 25, 40 ]"
                                  :rows-per-page-text="'Registros por página'"
                                  class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.mensagem_id }}</td>
                            <td class="text-xs-center">{{ props.item.titulo }}</td>
                            <td class="text-xs-center">{{ props.item.descricao }}</td>
                            <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
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
                            <v-btn color="primary" @click="this.obterMensagems">Reset</v-btn>
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
    plataformasSelecionadas: [],
    headers: [
      {
        text: 'Identificador',
        align: 'center',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Título',
        value: 'titulo',
        align: 'center',
      },
      {
        text: 'Descrição',
        value: 'descricao',
        align: 'center',
      },
      {
        text: 'Situação',
        value: 'situacao',
        align: 'center',
      },
      {
        text: 'Ação',
        value: 'acao',
        align: 'center',
        sortable: false,
      },
    ],
    mensagensRenderizadas: [],
    sistemasRenderizados: [],
    editedIndex: -1,
    editedItem: {
      mensagem_id: null,
      autor_id: null,
      sistema_id: null,
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
      mensagens: 'mensagem/mensagens',
      sistemas: 'sistema/sistema',
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

      if (this.editedItem.descricao != null) {
        this.exibirBotaoGravar = false;
      }


      val || this.close();
    },
    mensagens(value) {
      if ('error' in value) {
        alert(value.error);
        this.mensagensRenderizadas = [];
      } else {
        this.mensagensRenderizadas = value;
      }
    },
    sistemas(value) {
      if ('error' in value) {
        this.sistemasRenderizados = [];
      } else {
        this.sistemasRenderizados = value;
      }
    },
    editedItem(value) {
      this.plataformasSelecionadas = [];
      for (const index in value.plataformas) {
        this.plataformasSelecionadas.push(value.plataformas[index].plataforma_id);
      }

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
    if (this.mensagens.length == null || this.mensagens.length == 0) {
      this.obterMensagems();
    }
    if (this.mensagens.length > 0) {
      this.mensagensRenderizadas = this.mensagens;
    }
    if (this.sistemas.length == null || this.sistemas.length == 0) {
      this.obterSistemas();
    }
    if (this.sistemas.length > 0) {
      this.sistemasRenderizados = this.sistemas;
    }
    if (this.contas.length == null || this.contas.length == 0) {
      this.obterContas();
    }
    if (this.plataformas.length == null || this.plataformas.length == 0) {
      this.obterPlataformas();
    }
  },
  // editedItem
  methods: {

    ...mapActions({
      obterSistemas: 'sistema/obterSistemas',
      obterMensagems: 'mensagem/obterMensagems',
      obterContas: 'conta/obterContas',
      obterPlataformas: 'plataforma/obterPlataformas',
      removerMensagem: 'mensagem/removerMensagem',
      cadastrarMensagem: 'mensagem/cadastrarMensagem',
      atualizarMensagem: 'mensagem/atualizarMensagem',
    }),

    editItem(item) {
      this.editedIndex = this.mensagens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm('Deseja remover esse item?')) {
        this.removerMensagem(item.mensagem_id);
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
        this.atualizarMensagem(self.editedItem);
      } else {
        this.cadastrarMensagem(self.editedItem);
      }
      self.close();
    },

    obterNomeAutor(usuario_id) {
      // console.log(usuario_id);
      if (this.contas.length == null) {
        this.obterContas();
      }

      for (const index in this.contas) {
        if (this.contas[index].usuario_id == usuario_id) {
          return this.contas[index].nome;
        }
      }
    },

    isPlataformaSelecionada(plataformasSelecionadas, plataforma_id) {
      for (const index in plataformasSelecionadas) {
        if (plataformasSelecionadas[index].plataforma_id == plataforma_id) {
          return true;
        }
      }
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
