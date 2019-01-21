<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat light>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Contas</v-toolbar-title>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card light>
                            <v-card-title>
                                <span class="headline">{{ formTitle }} Conta</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-text-field
                                                    prepend-icon="face"
                                                    v-model="editedItem.nome"
                                                    :rules="[rules.required, rules.minLength]"
                                                    required
                                                    label="Nome"></v-text-field>
                                            <v-text-field
                                                    prepend-icon="person"
                                                    v-model="editedItem.email"
                                                    :rules="[rules.required, rules.email, rules.minLength]"
                                                    required
                                                    label="E-mail"></v-text-field>
                                            <v-text-field
                                                    prepend-icon="lock"
                                                    type="password"
                                                    v-model="editedItem.password"
                                                    label="Senha"
                                                    v-validate="{ required: true, min: 6 }"
                                                    class="form-control"
                                                    :rules="[rules.required, rules.minLength]"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md12>
                                            <v-switch :label="`${editedItem.is_admin ? 'É Administrador' : 'Não é Administrador'}`"
                                                      v-model="editedItem.is_admin"></v-switch>
                                            <v-switch :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                                                      v-model="editedItem.is_ativo"></v-switch>
                                        </v-flex>
                                        <v-flex xs12 sm6 md12 v-if="editedItem.usuario_id == 0">
                                            OBS: Senha padrão é <b>12345</b>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click.native="close">Fechar</v-btn>
                                <v-btn :loading="loading"
                                       color="blue darken-1"
                                       dark
                                       @click.native="save">Gravar</v-btn>
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
                            :rows-per-page-items="[ 10, 25, 40 ]"
                            class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.usuario_id }}</td>
                            <td class="text-xs-center">{{ props.item.nome }}</td>
                            <td class="text-xs-center">{{ props.item.email }}</td>
                            <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                            <td class="text-xs-center">
                                <v-icon v-if="props.item.is_admin" color="primary">check_circle_outline</v-icon>
                            </td>
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
      is_admin: false,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    rules: {
      required: value => !!value || 'Campo Obrigatório.',
      minLength: object => (object != null && object.length != null && object.length > 3) || 'Campo obrigatório.',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'E-mail inválido.';
      },
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
