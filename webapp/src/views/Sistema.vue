<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat dark>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sistemas</v-toolbar-title>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }} Sistema</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm6 md12>
                                            <v-text-field v-model="editedItem.descricao"
                                                          required
                                                          label="Descrição"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md12>
                                            <v-text-field v-model="editedItem.url"
                                                          required
                                                          label="URL"></v-text-field>
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
                            :items="sistemasIniciais"
                            class="elevation-1">
                        <template slot="items" slot-scope="props">
                            <td class="text-xs-center">{{ props.item.sistema_id }}</td>
                            <td class="text-xs-center">{{ props.item.descricao }}</td>
                            <td class="text-xs-center">{{ props.item.url }}</td>
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
                            <v-btn color="primary" @click="this.obterSistemas">Reset</v-btn>
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
                    text: 'Descrição',
                    value: 'descricao',
                    align: 'center'
                },
                {
                    text: 'Url',
                    value: 'url',
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
            sistemasIniciais: [],
            editedIndex: -1,
            editedItem: {
                sistema_id: null,
                descricao: null,
                url: null,
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
                sistemas: 'sistema/sistema'
            }),
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            sistemas(value) {
                if ('error' in value) {
                    alert(value.error);
                    this.sistemasIniciais = [];
                } else {
                    this.sistemasIniciais = value;
                }
            },

        },

        created() {
            this.obterSistemas();
        },

        methods: {

            ...mapActions({
                obterSistemas: 'sistema/obterSistemas',
                removerSistema: 'sistema/removerSistema',
                cadastrarSistema: 'sistema/cadastrarSistema',
                atualizarSistema: 'sistema/atualizarSistema',
            }),

            editItem(item) {
                this.editedIndex = this.sistemas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                if (confirm('Deseja remover esse item?')) {
                    this.removerSistema(item.sistema_id);
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
                    this.atualizarSistema(self.editedItem)
                } else {
                    this.cadastrarSistema(self.editedItem)
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
