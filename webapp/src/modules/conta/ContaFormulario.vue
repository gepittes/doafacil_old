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
        </v-layout>
    </v-container>

</template>
<script>

import { mapActions } from 'vuex';

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
            plataforma_id: null,
            descricao: '',
            is_ativo: true,
        },
    }),

    computed: {
        formTitle() {
            return this.editedItem.plataforma_id === null ? 'Criar' : 'Editar';
        },
    },

    watch: {
        item(value) {
            this.editedItem = Object.assign({}, value);
        },
    },
    mounted() {
        this.editedItem = Object.assign({}, this.defaultItem);
    },

    methods: {

        ...mapActions({
            cadastrarPlataforma: 'plataforma/cadastrarPlataforma',
            atualizarPlataforma: 'plataforma/atualizarPlataforma',
        }),

        save() {
            const self = this;
            if (self.editedItem.is_ativo === null || self.editedItem.is_ativo === '') {
                self.editedItem.is_ativo = false;
            }
            if (self.editedItem.plataforma_id !== null) {
                self.atualizarPlataforma(self.editedItem);
            } else {
                self.cadastrarPlataforma(self.editedItem);
            }
            this.$emit('update:dialog', false);
        },

        close() {
            this.editedItem = Object.assign({}, this.defaultItem);
            this.$emit('update:dialog', false);
        },
    },
};

</script>
