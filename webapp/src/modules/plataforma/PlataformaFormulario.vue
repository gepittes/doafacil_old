<template>

    <v-container grid-list-md>
        <v-layout wrap>
            <v-flex
                xs12
                sm6
                md12>
                <v-text-field
                    v-model="editedItem.descricao"
                    label="Descrição"/>
            </v-flex>
            <v-flex
                xs12
                sm6
                md12>
                <h3>Situação:</h3>
                <v-switch
                    :label="`${editedItem.is_ativo ? 'Ativo' : 'Inativo'}`"
                    v-model="editedItem.is_ativo"/>
            </v-flex>
            <v-flex class="text-xs-center">
                <v-btn
                    v-if="!loading"
                    dark
                    color="blue darken-1"
                    @click.native="save">Gravar</v-btn>
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
            default: () => {},
        },
        index: {
            type: Number,
            default: () => {},
        },
        dialog: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data: () => ({
        loading: false,
        editedIndex: -1,
        editedItem: {
            plataforma_id: null,
            descricao: '',
            is_ativo: true,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Criar' : 'Editar';
        },
    },

    watch: {
        item(value) {
            this.editedItem = Object.assign({}, value);
        },
        index(value) {
            this.editedIndex = Object.assign({}, value);
        },
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
    },
};

</script>
