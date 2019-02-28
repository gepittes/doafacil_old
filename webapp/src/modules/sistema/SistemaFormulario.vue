<template>
    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="editedItem.descricao"
                    required
                    label="Descrição"/>
            </v-flex>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="editedItem.url"
                    required
                    label="URL"/>
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
            sistema_id: null,
            descricao: '',
            url: '',
            is_ativo: true,
        },
    }),

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
            cadastrarSistema: 'sistema/cadastrarSistema',
            atualizarSistema: 'sistema/atualizarSistema',
        }),

        save() {
            const self = this;
            if (self.editedItem.is_ativo === null || self.editedItem.is_ativo === '') {
                self.editedItem.is_ativo = false;
            }
            if (self.editedItem.sistema_id !== null) {
                self.atualizarSistema(self.editedItem);
            } else {
                self.cadastrarSistema(self.editedItem);
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
