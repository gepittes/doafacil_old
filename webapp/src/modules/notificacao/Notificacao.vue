<template>
    <v-container fluid>
        <v-layout
            column
            justify-center>
            <v-card flat>
                <v-toolbar
                    dark
                    color="primary">
                    <v-toolbar-title>Notificacões</v-toolbar-title>
                    <v-dialog
                        v-model="dialog"
                        max-width="500px">
                        <v-card>
                            <v-card-title light>
                                <span class="headline">{{ formTitle }} Notificação</span>
                            </v-card-title>

                            <v-card-text>
                                <notificacao-formulario
                                    :item="editedItem"
                                    :dialog.sync="dialog"/>
                            </v-card-text>

                        </v-card>

                    </v-dialog>
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
                        :items="notificacoesRenderizadas"
                        :search="modeloBuscar"
                        :rows-per-page-items="[ 10, 25, 40 ]"
                        :rows-per-page-text="'Registros por página'"
                        light
                        class="elevation-1">
                        <template
                            slot="items"
                            slot-scope="props">
                            <td class="text-xs-center">{{ props.item.notificacao_id }}</td>
                            <td class="text-xs-center">{{ props.item.codigo_destinatario }}</td>
                            <td class="text-xs-center">{{ props.item.mensagem.titulo }}</td>
                            <td class="text-xs-center">{{ props.item.data_envio | formatDate }}</td>
                            <td class="text-xs-center">
                                <v-icon
                                    v-if="props.item.is_notificacao_lida"
                                    color="blue">thumb_up</v-icon>
                                <v-icon
                                    v-if="!props.item.is_notificacao_lida"
                                    color="red">thumb_down</v-icon>
                            </td>
                            <td
                                v-if="accountInfo.is_admin && verificaSistema(props.item.mensagem.sistema_id)"
                                class="justify-center layout px-0">
                                <v-btn icon>
                                    <v-icon
                                        color="grey darken-1"
                                        @click="deleteItem(props.item)">delete
                                    </v-icon>
                                </v-btn>
                            </td>
                            <td
                                v-else
                                class="justify-center layout px-0 pt-3"> -
                            </td>
                        </template>
                        <template slot="no-data">
                            <v-btn
                                color="primary"
                                @click="obterNotificacaos">Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-layout>
        <v-scale-transition v-if="accountInfo.is_admin">
            <v-btn
                fab
                color="success"
                dark
                fixed
                bottom
                right
                @click="newItem()">
                <v-icon>add</v-icon>
            </v-btn>
        </v-scale-transition>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import NotificacaoFormulario from './NotificacaoFormulario';

export default {
    components: { NotificacaoFormulario },
    data: () => ({
        loading: false,
        dialog: false,
        exibirBotaoGravar: true,
        modeloBuscar: '',
        headers: [
            {
                text: 'Identificador',
                align: 'center',
                sortable: true,
                value: 'notificacao_id',
            },
            {
                text: 'Código Destinatário',
                value: 'codigo_destinatario',
                align: 'center',
            },
            {
                text: 'Mensagem',
                value: 'mensagem.titulo',
                align: 'center',
            },
            {
                text: 'Data de envio',
                value: 'data_envio',
                align: 'center',
            },
            {
                text: 'Notificação Lida',
                value: 'is_notificacao_lida',
                align: 'center',
            },
            {
                text: 'Ação',
                value: 'acao',
                align: 'center',
                sortable: false,
            },
        ],
        notificacoesRenderizadas: [],

        editedItem: {},
        defaultItem: {
            notificacao_id: null,
            autor_id: null,
            mensagem_id: null,
            mensagem: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
        },
        websocket: {
            connection: null,
        },
    }),

    computed: {
        formTitle() {
            return this.editedItem.notificacao_id === null ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            notificacoes: 'notificacao/notificacoes',
            contas: 'conta/conta',
            plataformas: 'plataforma/plataforma',
            accountInfo: 'account/accountInfo',
        }),
    },

    watch: {
        dialog() {
            if (this.editedItem.autor_id == null) {
                this.editedItem.autor_id = this.accountInfo.user_id;
            }
            this.exibirBotaoGravar = true;
            if (this.editedItem.notificacao_id != null) {
                this.exibirBotaoGravar = false;
            }
        },
        notificacoes(value) {
            if ('error' in value) {
                alert(value.error);
                this.notificacoesRenderizadas = [];
            } else {
                this.notificacoesRenderizadas = value;
            }
        },

        editedItem() {
            if (this.editedItem.autor_id == null) {
                this.editedItem.autor_id = this.accountInfo.user_id;
            }
        },
    },
    mounted() {
        this.editedItem = Object.assign({}, this.defaultItem);
        if (this.notificacoes.length == null || this.notificacoes.length === 0) {
            this.obterNotificacaos();
        }
        if (this.notificacoes.length > 0) {
            this.notificacoesRenderizadas = this.notificacoes;
        }

        if (this.contas.length == null || this.contas.length === 0) {
            this.obterContas();
        }
        if (this.plataformas.length == null || this.plataformas.length === 0) {
            this.obterPlataformas();
        }

        this.websocket.connection = new WebSocket(`ws://${process.env.VUE_APP_WEBSOCKET_HOST}:${process.env.VUE_APP_WEBSOCKET_PORT}`);

        this.websocket.connection.onopen = function (e) {
            console.log('Conexão estabelecida - Componente Notificacao.vue');
            console.log(e);
        };
    },
    // editedItem
    methods: {

        ...mapActions({
            obterNotificacaos: 'notificacao/obterNotificacaos',
            obterContas: 'conta/obterContas',
            obterPlataformas: 'plataforma/obterPlataformas',
            removerNotificacao: 'notificacao/removerNotificacao',
        }),

        newItem() {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.dialog = true;
        },

        editItem(item) {
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            // eslint-disable-next-line
            if (confirm('Deseja remover esse item?')) {
                if (this.accountInfo.is_admin !== true) {
                    this.$store.dispatch('alert/error', 'Usuário sem privilégios administrativos.', { root: true });
                }
                if (this.accountInfo.is_admin === true) {
                    this.removerNotificacao(item.notificacao_id);
                }
            }
        },
        verificaSistema(sistemaNotificacao){
            const self = this;
            const { sistemas }  = self.accountInfo;
            let vinculo = 0;
            sistemas.forEach((value, index) => {
                if (parseInt(value.sistema_id, 10) === parseInt(sistemaNotificacao, 10)) {
                    vinculo = 1;
                }
            });

            return vinculo;
        },
    },
};

</script>
