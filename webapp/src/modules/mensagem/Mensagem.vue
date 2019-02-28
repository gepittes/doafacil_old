<template>
    <v-container fluid>
        <v-layout
            column
            justify-center>
            <v-card
                flat
                dark>
                <v-toolbar
                    dark
                    color="primary">
                    <v-spacer/>
                    <v-spacer/>
                    <v-spacer/>
                    <v-text-field
                        v-model="modeloBuscar"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                    />
                </v-toolbar>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="mensagensRenderizadas"
                        :search="modeloBuscar"
                        :rows-per-page-items="[ 10, 25, 40 ]"
                        :rows-per-page-text="'Registros por página'"
                        light
                        class="elevation-1">
                        <template
                            slot="items"
                            slot-scope="props">
                            <td class="text-xs-center">{{ props.item.mensagem_id }}</td>
                            <td class="text-xs-center">{{ props.item.titulo }}</td>
                            <td class="text-xs-center">{{ props.item.descricao }}</td>
                            <td class="text-xs-center">
                                {{ props.item.is_ativo ? "Ativo" : "Inativo" }}
                            </td>
                            <td class="justify-center layout px-0">
                                <v-btn icon>
                                    <v-icon
                                        color="grey darken-1"
                                        @click="editItem(props.item)">search
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
                            <v-btn
                                color="primary"
                                @click="obterMensagems">Reset</v-btn>
                        </template>
                    </v-data-table>
                    <v-btn
                        fab
                        color="success"
                        dark
                        fixed
                        bottom
                        right
                        @click="dialog = !dialog">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-layout>
        <v-dialog
            v-model="dialog"
            max-width="500px" >
            <v-card>
                <v-card-title light>
                    <span class="headline">{{ formTitle }} Mensagem</span>
                </v-card-title>

                <v-card-text>
                    <mensagem-formulario
                        :item="editedItem"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import MensagemFormulario from './MensagemFormulario.vue';

export default {
    components: {
        MensagemFormulario,
    },
    data: () => ({
        dialog: false,
        exibirBotaoGravar: true,
        plataformasSelecionadas: [],
        mensagensRenderizadas: [],
        sistemasRenderizados: [],
        modeloBuscar: '',
        editedIndex: -1,
        editedItem: {
            mensagem_id: null,
            titulo: null,
            autor_id: null,
            sistema_id: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
        },
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
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Criar' : '';
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
            if (this.editedItem.autor_id == null && this.accountInfo.user_id !== null) {
                this.editedItem.autor_id = this.accountInfo.user_id;
            }

            this.exibirBotaoGravar = true;
            if (this.editedItem.mensagem_id != null) {
                this.exibirBotaoGravar = false;
            }

            return val || this.close();
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
            const self = this;
            self.plataformasSelecionadas = [];
            if (self.editedItem.autor_id == null) {
                self.editedItem.autor_id = self.accountInfo.user_id;
            } else if (Object.prototype.hasOwnProperty.call(value, 'plataformas')) {
                Object.keys(value.plataformas).forEach((indice) => {
                    self.plataformasSelecionadas.push(value.plataformas[indice]);
                });
            }
        },

    },
    mounted() {
        if (this.mensagens.length == null || this.mensagens.length === 0) {
            this.obterMensagems();
        }
        if (this.mensagens.length > 0) {
            this.mensagensRenderizadas = this.mensagens;
        }
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
        if (this.sistemas.length > 0) {
            this.sistemasRenderizados = this.sistemas;
        }
        if (this.contas.length == null || this.contas.length === 0) {
            this.obterContas();
        }
        if (this.plataformas.length == null || this.plataformas.length === 0) {
            this.obterPlataformas();
        }
    },
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
            // eslint-disable-next-line
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

    },
};
</script>
