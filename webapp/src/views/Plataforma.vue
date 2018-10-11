<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat>
                <v-subheader>Plataformas</v-subheader>
                <v-data-table
                        :headers="headers"
                        :items="plataformas"
                        class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.plataforma_id }}</td>
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
                        <v-btn color="primary" @click="this.obterPlataformas">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </v-layout>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Plataforma</span>
                </v-card-title>
                <v-subheader>Preencha os dados da plataforma.</v-subheader>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md12>
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
                   fab
                   dark
                   absolute
                   right>
                <v-icon>add</v-icon>
            </v-btn>
        </v-dialog>
    </v-container>

</template>
<script>

    import axios from 'axios'

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
                    value: 'name'
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
            // plataformas: [],
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
                protein: 0
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Criar' : 'Editar'
            },
            ...mapGetters({
                plataformas: 'plataforma/plataforma'
            }),
        },

        watch: {
            dialog(val) {
                val || this.close()
            }
        },

        created() {
            this.obterPlataformas();
        },

        methods: {

            ...mapActions({
                obterPlataformas: 'plataforma/obterPlataformas'
            }),

            editItem(item) {
                this.editedIndex = this.plataformas.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const self = this;
                const index = self.plataformas.indexOf(item)
                if (confirm('Are you sure you want to delete this item?')) {

                    axios.delete('http://localhost/v1/plataforma/' + item.plataforma_id)
                        .then(function () {
                            self.plataformas.splice(index, 1);
                        });
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
                    axios.patch('http://localhost/v1/plataforma/' + self.editedItem.plataforma_id, self.editedItem)
                        .then(() => {
                            Object.assign(self.plataformas[self.editedIndex], self.editedItem)
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => self.loading = false)
                } else {
                    axios.post('http://localhost/v1/plataforma', self.editedItem)
                        .then(response => {
                            self.editedItem.plataforma_id = response.data.data.plataforma_id;
                            self.plataformas.push(self.editedItem);
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        .finally(() => self.loading = false)

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
