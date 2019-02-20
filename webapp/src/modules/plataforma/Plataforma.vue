<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat dark>
                <v-toolbar dark color="primary">
                    <v-spacer></v-spacer>
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
                                  :items="plataformasIniciais"
                                  :search="modeloBuscar"
                                  :rows-per-page-items="[ 10, 25, 40 ]"
                                  :rows-per-page-text="'Registros por página'"
                                  class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.plataforma_id }}</td>
                            <td class="text-xs-center">{{ props.item.descricao }}</td>
                            <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                            <td class="justify-center layout px-0">
                                <v-btn icon>
                                    <v-icon
                                        color="grey darken-1"
                                        @click="editItem(props.item)">edit
                                    </v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon
                                        color="grey darken-1"
                                        @click="deleteItem(props.item)">delete
                                    </v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-btn color="primary" @click="this.obterPlataformas">Reset</v-btn>
                        </template>
                    </v-data-table>
                    <v-scale-transition>
                        <v-btn fab
                               color="success"
                               dark
                               fixed
                               bottom
                               right
                               @click="dialog = !dialog">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-scale-transition>
                </v-card-text>
            </v-card>
        </v-layout>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Plataforma</span>
                </v-card-title>
                <!--<v-subheader>Preencha os dados da plataforma.</v-subheader>-->

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md12>
                                <v-text-field v-model="editedItem.descricao"
                                              label="Descrição"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <h3>Situação:</h3>
                                <v-switch :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                                          v-model="editedItem.is_ativo"></v-switch>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error"  @click.native="close">Cancelar</v-btn>
                    <v-btn dark v-if="!loading" color="blue darken-1" @click.native="save">Gravar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</template>
<script>

  import {mapActions, mapGetters} from 'vuex';

  export default {
    data: () => ({
      loading: false,
      dialog: false,
      modeloBuscar: '',
      headers: [
        {
          text: 'Identificador',
          align: 'center',
          sortable: true,
          value: 'name',
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
      plataformasIniciais: [],
      editedIndex: -1,
      editedItem: {
        plataforma_id: 0,
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
        plataformas: 'plataforma/plataforma',
      }),
    },

    watch: {
      dialog(val) {
        val || this.close();
      },
      plataformas(value) {
        if ('error' in value) {
          alert(value.error);
          this.plataformasIniciais = [];
        } else {
          this.plataformasIniciais = value;
        }
      },

    },

    created() {
      this.obterPlataformas();
    },

    methods: {

      ...mapActions({
        obterPlataformas: 'plataforma/obterPlataformas',
        removerPlataforma: 'plataforma/removerPlataforma',
        cadastrarPlataforma: 'plataforma/cadastrarPlataforma',
        atualizarPlataforma: 'plataforma/atualizarPlataforma',
      }),

      editItem(item) {
        this.editedIndex = this.plataformas.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        if (confirm('Deseja remover esse item?')) {
          this.removerPlataforma(item.plataforma_id);
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
          this.atualizarPlataforma(self.editedItem);
        } else {
          this.cadastrarPlataforma(self.editedItem);
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
