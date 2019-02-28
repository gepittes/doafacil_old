<template>

    <v-container grid-list-md>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="save()">
            <v-layout wrap>
                <v-flex
                    xs12
                    sm6
                    md12>
                    <v-text-field
                        v-model="editedItem.titulo"
                        :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                        label="Título"
                        box
                        minlength="3"
                        required/>
                    <v-textarea
                        v-model="editedItem.descricao"
                        :rules="[(object) => object!= null && object.length > 3 || 'Campo obrigatório.']"
                        auto-grow
                        box
                        color="deep-purple"
                        label="Descrição"
                        required
                        rows="5"
                    />

                    <h3 v-if="editedItem.mensagem_id != null"> Plataformas </h3>
                    <div style="overflow: auto; max-height: 300px">
                        <v-list v-if="editedItem.mensagem_id == null">
                            <v-list-tile
                                v-for="plataforma in plataformas"
                                :key="plataforma.title"
                                avatar>
                                <v-list-tile-content>
                                    <v-checkbox
                                        v-model="editedItem.plataformas"
                                        :label="plataforma.descricao"
                                        :value="plataforma"
                                        color="success"
                                        required/>
                                </v-list-tile-content>

                            </v-list-tile>
                            <v-list-tile
                                v-for="plataforma in editedItem.plataformas"
                                :key="plataforma.title"
                                avatar>
                                <v-list-tile-content>
                                    {{ plataforma.descricao }}
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </div>
                    <br>

                    <v-select
                        v-model="editedItem.sistema_id"
                        :disabled="editedItem.mensagem_id != null"
                        :items="sistemasRenderizados"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        label="Sistema"
                        box
                        item-text="descricao"
                        item-value="sistema_id"
                        required/>

                    <v-text-field
                        v-if="plataformasSelecionadas.length > 0"
                        :value="obterNomeAutor(editedItem.autor_id)"
                        disabled
                        label="Autor"
                        box/>

                </v-flex>
                <v-flex
                    xs12
                    sm6
                    md12>
                    <h3>Situação</h3>
                    <v-switch
                        :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                        v-model="editedItem.is_ativo"/>
                </v-flex>
            </v-layout>
            <v-layout class="text-xs-center">
                <v-flex md12>
                    <v-btn
                        color="error"
                        @click.native="close">Fechar</v-btn>
                    <v-btn
                        v-if="!loading && editedItem.autor_id === null"
                        dark
                        color="blue darken-1">
                        Gravar
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    props: {
        item: {
            type: Object,
            default: () => {
            },
        },
    },
    data: () => ({
        valid: true,
        loading: false,
        plataformasSelecionadas: [],
        mensagensRenderizadas: [],
        sistemasRenderizados: [],
        editedItem: {
            titulo: null,
            mensagem_id: null,
            autor_id: null,
            sistema_id: null,
            descricao: '',
            is_ativo: true,
            plataformas: [],
        },
    }),
    computed: {
        formTitle() {
            return this.editedItem.mensagem_id === null ? 'Criar' : 'Visualizar';
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
        item(val) {
            this.editedItem = Object.assign({}, val);
        },
        mensagens(value) {
            if ('error' in value) {
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
            this.plataformasSelecionadas = [];
            if (this.editedItem.autor_id == null) {
                this.editedItem.autor_id = this.accountInfo.user_id;
            } else {
                Object.keys(value.plataformas).forEach((indice) => {
                    this.plataformasSelecionadas.push(value.plataformas[indice]);
                });
            }
        },
    },

    mounted() {
        this.editedItem = Object.assign({}, this.defaultItem);
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
        save() {
            const self = this;
            self.loading = true;

            if (self.editedItem.mensagem_id !== null) {
                this.atualizarMensagem(self.editedItem);
            } else {
                this.cadastrarMensagem(self.editedItem);
            }
            self.close();
        },

        obterNomeAutor(usuarioId) {
            if (this.contas.length == null) {
                this.obterContas();
            }

            let nomeAutor = '';
            const self = this;

            this.contas.every((item, indice) => {
                if (this.contas[indice].usuario_id === usuarioId) {
                    nomeAutor = self.contas[indice].nome;
                    return false;
                }
                return true;
            });
            return nomeAutor;
        },
        close() {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
        },

    },
};

</script>
