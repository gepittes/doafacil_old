<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat>
                <v-subheader>Plataformas</v-subheader>

                <v-data-table
                        :headers="headers"
                        :items="plataformas"
                        class="elevation-1">
                    <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                        <span slot="activator">
                          {{ props.header.text }}
                        </span>
                            <span>
                          {{ props.header.text }}
                        </span>
                        </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.plataforma_id }}</td>
                        <td>{{ props.item.descricao }}</td>
                        <td>{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                        <td>
                            <v-tooltip top>
                                <v-btn fab dark small color="indigo" slot="activator">
                                    <v-icon dark>create</v-icon>
                                </v-btn>
                                <span>Editar</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <v-btn fab dark small color="cyan" slot="activator">
                                    <v-icon dark>delete</v-icon>
                                </v-btn>
                                <span>Remover</span>
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card>

            <v-dialog v-model="dialog" persistent max-width="290">
                <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                <v-card>
                    <v-card-title class="headline justify-center">Atenção</v-card-title>
                    <v-card-text>Deseja mesmo remover a plataforma?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="dialog = false">Não</v-btn>
                        <v-btn color="red darken-1" flat @click.native="dialog = false">Sim</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-container>

</template>
<script>

    import axios from 'axios'

    export default {
        data() {
            return {
                dialog: false,
                bottomNav: 'recent',
                plataformas: [],
                headers: [
                    {
                        text: 'Identificador',
                        align: 'left',
                        sortable: true,
                        value: 'name'
                    },
                    {
                        text: 'Descrição',
                        value: 'descricao',
                        align: 'left'
                    },
                    {
                        text: 'Situação',
                        value: 'situacao',
                        align: 'left'
                    },
                    {
                        text: 'Ação',
                        value: 'acao',
                        align: 'left',
                        sortable: false,
                    },
                ]
            }
        },
        created() {
            this.buscarPlataformas()
        },
        methods: {
            buscarPlataformas() {
                axios.get('http://localhost/v1/plataforma')
                    .then(response => {
                        const data = response.data;
                        this.plataformas = data.data;
                    })
                    // .then(response => (this.info = response.data.bpi))
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => this.loading = false)
            },
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
