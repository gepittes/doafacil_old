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
                        :items="contasIniciais"
                        :search="modeloBuscar"
                        :rows-per-page-items="[ 10, 25, 40 ]"
                        :rows-per-page-text="'Registros por página'"
                        light
                        class="elevation-1">
                        <template
                            slot="items"
                            slot-scope="props">
                            <td class="text-xs-center">{{ props.item.usuario_id }}</td>
                            <td class="text-xs-center" v-html="props.item.nome"></td>
                            <td class="text-xs-center">{{ props.item.email }}</td>
                            <td class="text-xs-center">{{ props.item.is_ativo ? "Ativo" : "Inativo" }}</td>
                            <td class="text-xs-center">
                                <v-icon
                                    v-if="props.item.is_admin"
                                    color="primary">check_circle_outline</v-icon>
                            </td>
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
                            <v-btn
                                color="primary"
                                @click="obterContas">Reset</v-btn>
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
            max-width="500px">
            <v-card light>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Conta</span>
                </v-card-title>

                <v-card-text>
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
                                    required
                                />
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
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="error"
                        @click.native="close">Fechar</v-btn>
                    <v-btn
                        :loading="loading"
                        color="blue darken-1"
                        dark
                        @click.native="save">Gravar</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-container>

</template>
<script>

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
                value: 'name',
            },
            {
                text: 'Nome',
                value: 'nome',
                align: 'center',
            },
            {
                text: 'E-mail',
                value: 'email',
                align: 'center',
            },
            {
                text: 'Situação',
                value: 'situacao',
                align: 'center',
            },
            {
                text: 'Administrador',
                value: 'is_admin',
                align: 'center',
            },
            {
                text: 'Ação',
                value: 'acao',
                align: 'center',
                sortable: false,
            },
        ],
        contasIniciais: [],
        editedIndex: -1,
        editedItem: {
            usuario_id: null,
            descricao: '',
            is_ativo: true,
            is_admin: false,
            sistemas: [],
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        modeloBuscar: '',
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
        formTitle() {
            return this.editedIndex === -1 ? 'Criar' : 'Editar';
        },
        ...mapGetters({
            sistemas: 'sistema/sistema',
            contas: 'conta/conta',
            accountInfo: 'account/accountInfo',
        }),
    },

    watch: {
        dialog(val) {
            return val || this.close();
        },
        contas(value) {
            if ('error' in value) {
                alert(value.error);
                this.contasIniciais = [];
            } else {
                this.contasIniciais = value;
            }
        },
        editedItem() {

        },
    },

    created() {
        this.obterContas();
    },
    mounted() {
        if (this.sistemas.length == null || this.sistemas.length === 0) {
            this.obterSistemas();
        }
    },
    methods: {

        ...mapActions({
            obterContas: 'conta/obterContas',
            obterSistemas: 'sistema/obterSistemas',
            removerConta: 'conta/removerConta',
            cadastrarConta: 'conta/cadastrarConta',
            atualizarConta: 'conta/atualizarConta',
        }),

        editItem(item) {
            const self = this;
            if (self.accountInfo.is_admin !== true) {
                self.$store.dispatch('alert/error', 'Usuário sem privilégios administrativos.', { root: true });
            }
            if (self.accountInfo.is_admin === true) {
                self.editedIndex = self.contas.indexOf(item);
                self.editedItem.sistemas = [];
                self.editedItem = Object.assign({}, item);
                self.dialog = true;

                if (Object.prototype.hasOwnProperty.call(self.editedItem, 'sistemas')) {
                    Object.keys(self.editedItem.sistemas).forEach((indice) => {
                        delete self.editedItem.sistemas[indice].usuario_has_sistema;
      });

    }}
        },

        deleteItem(item) {
            // eslint-disable-next-line
            if (confirm('Deseja remover esse item?')) {
                if (this.accountInfo.is_admin !== true) {
                    this.$store.dispatch('alert/error', 'Usuário sem privilégios administrativos.', { root: true });
                }
                if (this.accountInfo.is_admin === true) {
                    this.removerConta(item.usuario_id);
                }
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
                this.atualizarConta(self.editedItem);
            } else {
                this.cadastrarConta(self.editedItem);
            }
            self.loading = false;
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
