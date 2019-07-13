<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-data-table
                :headers="headers"
                :items="instituicoes"
                :search="search"
                hide-actions
                :pagination.sync="pagination"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.nome }}</td>
                <td class="text-xs-left">
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
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
    </div>

</template>
<script>

import { mapActions, mapGetters , mapState} from 'vuex';

export default {
    data: () => ({
        dialog: false,
        search: '',
        pagination: {},
        selected: [],
        listarInstituicoes: [],
        headers: [
            {
                text: 'Id',
                align: 'left',
                sortable: false,
                value: 'id'
            },
            {
                text: 'Nome',
                value: 'nome'
            },
            {
                text: 'Ações',
                value: 'nome'
            },
        ],

    }),
    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
        }),

        pages () {
            if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            ) return 0;
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
    },

    created() {
        this.obterInstituicoes();
        this.removerInstituicao();
    },
    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
            removerInstituicao: 'instituicao/removerInstituicao',
        }),

        editItem(item) {
            const self = this;

                self.editedIndex = self.instituicao.indexOf(item);
                self.editedItem = Object.assign({}, item);
                self.dialog = true;

                if (Object.prototype.hasOwnProperty.call(self.editedItem, 'sistemas')) {
                    Object.keys(self.editedItem.sistemas).forEach((indice) => {
                        delete self.editedItem.sistemas[indice].usuario_has_sistema;
                    });
                }
            }
        },

        deleteItem(item) {
                this.removerInstituicao(item.id);

            }
        },
};

</script>
