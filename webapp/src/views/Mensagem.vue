<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat dark>
                <v-toolbar dark color="success">
                    <v-toolbar-title>Mensagems</v-toolbar-title>
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
                                                          label="Título"></v-text-field>
                                            <v-text-field v-model="editedItem.descricao"
                                                          label="Descrição"></v-text-field>
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
                            :items="mensagemsIniciais"
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
                mensagems: 'mensagem/mensagem'
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

        },

        created() {
            this.obterMensagems();
        },

        methods: {

            ...mapActions({
                obterMensagems: 'mensagem/obterMensagems',
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
