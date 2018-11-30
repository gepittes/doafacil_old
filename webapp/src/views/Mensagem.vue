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
                                            <v-select v-model="editedItem.sistema_id"
                                                      :items="sistemasIniciais"
                                                      :rules="[v => !!v || 'Campo obrigatório']"
                                                      label="Sistema"
                                                      box
                                                      item-text="descricao"
                                                      item-value="sistema_id"
                                                      required></v-select>
                                            <v-text-field disabled :value="this.obterNomeAutor(editedItem.autor_id)"
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
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn v-if="!loading" color="blue darken-1" flat @click.native="save">Gravar
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
                                  :items="mensagemsIniciais"
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
                            <v-btn color="primary" @click="this.obterMensagems">Reset</v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-layout>
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
                    value: 'name'
                },
                {
                    text: 'Título',
                    value: 'titulo',
                    align: 'center'
                },
                {
                    text: 'Descrição',
                    value: 'descricao',
                    align: 'center'
                },
                {
                    text: 'Situação',
                    value: 'situacao',
                    align: 'center'
                },
                {
                    text: 'Ação',
                    value: 'acao',
                    align: 'center',
                    sortable: false,
                },
            ],
            mensagemsIniciais: [],
            sistemasIniciais: [],
            contasIniciais: [],
            editedIndex: -1,
            editedItem: {
                mensagem_id: 0,
                descricao: '',
                is_ativo: true,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Criar' : 'Editar'
            },
            ...mapGetters({
                mensagems: 'mensagem/mensagem',
                sistemas: 'sistema/sistema',
                contas: 'conta/conta'
            }),
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            mensagems(value) {
                if ('error' in value) {
                    alert(value.error);
                    this.mensagemsIniciais = [];
                } else {
                    this.mensagemsIniciais = value;
                }
            },
            sistemas(value) {
                if ('error' in value) {
                    this.sistemasIniciais = [];
                } else {
                    this.sistemasIniciais = value;
                }
            },
            contas(value) {
                if('error' in value) {
                    this.contasIniciais = [];
                } else {
                    this.contasIniciais = value;
                }
            }
        },
        created() {
            this.obterMensagems();
        },
        mounted() {
            if(this.sistemas.length == null) {
                this.obterSistemas();
            }
            if(this.contas.length == null) {
                this.obterContas();
            }
        },

        methods: {

            ...mapActions({
                obterSistemas: 'sistema/obterSistemas',
                obterMensagems: 'mensagem/obterMensagems',
                obterContas: 'conta/obterContas',
                removerMensagem: 'mensagem/removerMensagem',
                cadastrarMensagem: 'mensagem/cadastrarMensagem',
                atualizarMensagem: 'mensagem/atualizarMensagem',
            }),

            editItem(item) {
                this.editedIndex = this.mensagems.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                if (confirm('Deseja remover esse item?')) {
                    this.removerMensagem(item.mensagem_id);
                }
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                const self = this;
                self.loading = true;

                if (self.editedIndex > -1) {
                    this.atualizarMensagem(self.editedItem)
                } else {
                    this.cadastrarMensagem(self.editedItem)
                }
                self.close()
            },

            obterNomeAutor(usuario_id) {
                // console.log(usuario_id);
                if(this.contas.length == null) {
                    this.obterContas();
                }

                for (var i in this.contas) {
                    if(this.contas[i].usuario_id == usuario_id) {
                        return this.contas[i].nome;
                    }
                }
            }
        }
    }

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
