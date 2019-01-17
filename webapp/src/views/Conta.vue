<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat dark>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Contas</v-toolbar-title>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }} Conta</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-text-field v-model="editedItem.nome"
                                                          label="Nome"></v-text-field>
                                            <v-text-field v-model="editedItem.email"
                                                          label="E-mail"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md12>
                                            Administrador:
                                            <v-switch :label="`${editedItem.is_admin ? 'Sim' : 'Não'}`"
                                                      v-model="editedItem.id_admin"></v-switch>
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
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn v-if="!loading" color="blue darken-1" flat @click.native="save">Gravar
                                </v-btn>
                                <v-progress-circular
                                        v-if="loading"
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
                </v-toolbar>
                <v-card-text>
                    <v-data-table light
                            :headers="headers"
                            :items="contasIniciais"
                            class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.usuario_id }}</td>
                            <td class="text-xs-center">{{ props.item.nome }}</td>
                            <td class="text-xs-center">{{ props.item.email }}</td>
                            <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                            <td class="text-xs-center">{{ props.item.is_admin ? "Sim" : "Não" }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon small
                                        class="mr-2"
                                        @click="editItem(props.item)">
                                    edit
                                </v-icon>
                                <v-icon small
                                        @click="deleteItem(props.item)">
                                    delete
                                </v-icon>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-btn color="primary" @click="this.obterContas">Reset</v-btn>
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
    headers: [
      {
        text: 'Identificador',
        align: 'center',
        sortable: true,
        value: 'name',
      },
      {
        text: 'Nome',
        value: 'nome',
        align: 'center',
      },
      {
        text: 'E-mail',
        value: 'email',
        align: 'center',
      },
      {
        text: 'Situação',
        value: 'situacao',
        align: 'center',
      },
      {
        text: 'Administrador',
        value: 'is_admin',
        align: 'center',
      },
      {
        text: 'Ação',
        value: 'acao',
        align: 'center',
        sortable: false,
      },
    ],
    contasIniciais: [],
    editedIndex: -1,
    editedItem: {
      usuario_id: 0,
      descricao: '',
      is_ativo: true,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Criar' : 'Editar';
    },
    ...mapGetters({
      contas: 'conta/conta',
    }),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    contas(value) {
      if ('error' in value) {
        alert(value.error);
        this.contasIniciais = [];
      } else {
        this.contasIniciais = value;
      }
    },

  },

  created() {
    this.obterContas();
  },

  methods: {

    ...mapActions({
      obterContas: 'conta/obterContas',
      removerConta: 'conta/removerConta',
      cadastrarConta: 'conta/cadastrarConta',
      atualizarConta: 'conta/atualizarConta',
    }),

    editItem(item) {
      this.editedIndex = this.contas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm('Deseja remover esse item?')) {
        this.removerConta(item.usuario_id);
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
        this.atualizarConta(self.editedItem);
      } else {
        this.cadastrarConta(self.editedItem);
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
