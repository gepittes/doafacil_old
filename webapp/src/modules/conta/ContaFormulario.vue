<template>

    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="editedItem.nome"
                    :rules="[rules.required, rules.minLength]"
                    prepend-icon="face"
                    required
                    label="Nome"/>
                <v-text-field
                    v-model="editedItem.email"
                    :rules="[rules.required, rules.email, rules.minLength]"
                    prepend-icon="person"
                    required
                    label="E-mail"/>
                <v-text-field
                    v-validate="{ required: true, min: 6 }"
                    v-model="editedItem.password"
                    :rules="[rules.required, rules.minLength]"
                    prepend-icon="lock"
                    type="password"
                    label="Senha"
                    class="form-control"
                    required />
            </v-flex>
            <v-flex
                xs12
                sm6
                md12>
                <h3>Administração</h3>
                <v-switch
                    :label="`${editedItem.is_admin ? 'É Administrador' : 'Não é Administrador'}`"
                    v-model="editedItem.is_admin"/>
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
            <v-flex
                xs12
                sm6
                md12>
                <h3> Sistemas </h3>
                <v-list style="overflow: auto; max-height: 300px">
                    <v-list-tile
                        v-for="sistema in sistemas"
                        :key="sistema.title"
                        avatar>

                        <v-list-tile-content>
                            <v-checkbox
                                v-model="editedItem.sistemas"
                                :label="sistema.descricao"
                                :value="sistema"
                                color="success"
                                required/>
                        </v-list-tile-content>

                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex class="text-xs-center">
                <v-btn
                    color="error"
                    dark
                    @click.native="close">Fechar</v-btn>
                <v-btn
                    v-if="!loading"
                    dark
                    color="blue darken-1"
                    @click.native="save">Gravar
                </v-btn>
            </v-flex>
        </v-layout>
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
        dialog: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data: () => ({
        loading: false,
        editedItem: {},
        defaultItem: {
            usuario_id: null,
            descricao: '',
            is_ativo: true,
            is_admin: false,
            sistemas: [],
        },
        rules: {
            required: value => !!value || 'Campo Obrigatório.',
            minLength: object => (object != null && object.length != null && object.length > 3) || 'Campo obrigatório.',
            email: (value) => {
                // eslint-disable-next-line
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'E-mail inválido.';
            },
        },
    }),

    computed: {
        ...mapGetters({
            sistemas: 'sistema/sistema',
        }),
    },

    watch: {
        item(value) {
            this.editedItem = Object.assign({}, value);
        },
    },
    mounted() {
        this.editedItem = Object.assign({}, this.defaultItem);
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
    },

    methods: {

        ...mapActions({
            cadastrarConta: 'conta/cadastrarConta',
            obterSistemas: 'sistema/obterSistemas',
            atualizarConta: 'conta/atualizarConta',
        }),

        save() {
            const self = this;
            self.loading = true;

            if (self.editedItem.usuario_id !== null) {
                this.atualizarConta(self.editedItem);
            } else {
                this.cadastrarConta(self.editedItem);
            }
            self.loading = false;
            self.close();
        },

        close() {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
        },
    },
};

</script>
