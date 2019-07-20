<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-layout row justify-left>
            <v-btn
                    color="primary"
                    dark
                    @click.stop="[dialog = true]"
            >
                Add
            </v-btn>

            <v-dialog
                    v-model="dialog"
                    max-width="450"
            >
                <v-card>
                    <v-card-text>
                        <v-layout justify-space-around>
                            <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                            >
                                <v-text-field
                                        v-model="nome"
                                        :counter="20"
                                        :rules="nomeRules"
                                        label="Nome"
                                        value="!!isUptate"
                                        required
                                ></v-text-field>


                                <v-btn
                                        :disabled="!valid"
                                        color="success"
                                        @click="save">
                                    Salvar
                                </v-btn>
                                <v-btn
                                        color="error"
                                        @click="reset"
                                >
                                    Resetar Form
                                </v-btn>
                                <v-btn
                                        color="primary"
                                        @click="dialog = false"
                                >
                                    Fechar
                                </v-btn>
                            </v-form>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="listainstituicoes"
                :pagination.sync="pagination"
                class="elevation-1"
        >
            <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.nome }}</td>
                <td class="text-xs-center">
                    <v-btn icon>
                        <v-icon
                                color="grey darken-1"
                                @click="updateInstituicao(props.item)">edit
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
        <div class="text-xs-right pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
    </div>

</template>
<script>
import { mapActions, mapGetters} from 'vuex';

export default {
    data: () => ({
        valid: true,
        id: null,
        novaInstituicao: {
          id: null,
          nome:'',
        },
        nome: '',
        nomeRules: [],
        select: null,
        items: [
            'Item 1',
        ],
        dialog: false,
        pagination: {},
        selected: [],
        listainstituicoes: [],
        headers: [
            {
                text: 'Id',
                align: 'center',
                sortable: true,
                value: 'id'
            },
            {
                text: 'Nome',
                align: 'center',
                value: 'nome'
            },
            {
                text: 'Ações',
                align: 'center',
                value: 'nome'
            },

        ],

    }),

    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
        }),

        pages() {
            if (this.pagination.rowsPerPage == null ||
                this.pagination.totalItems == null
            ) return 0;
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
    },

    created() {
        this.obterInstituicoes();
    },

    watch: {
        instituicoes(value) {
            if ('error' in value) {
                alert(value.error);
                this.listainstituicoes = [];
            } else {
                this.listainstituicoes = value;
            }
        },
    },

    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
            removerInstituicao: 'instituicao/removerInstituicao',
            cadastrarInstituicao: 'instituicao/cadastrarInstituicao',
            atualizarInstituicao: 'instituicao/atualizarInstituicao',
        }),


        deleteItem(item) {
            this.removerInstituicao(item.id)
            this.obterInstituicoes()
        },

        reset () {
            this.$refs.form.reset()
        },

        // Preencher os camos para atualizar
        updateInstituicao (item){
            this.nome = item.nome;
            this.novaInstituicao.id = item.id;
            this.dialog = true
        },

        // salvar update
        save() {
            // if (!this.$refs.form.validate()) {
            // }

                if(this.novaInstituicao.id !== null){
                    this.novaInstituicao.nome = this.nome;
                    this.atualizarInstituicao(this.novaInstituicao);
                } else {
                    const instituicao = {
                        nome: this.nome,
                        id:null
                    };
                    this.cadastrarInstituicao(instituicao);
                }

            // limpar os campos
            this.nome = "";
            this.dialog = false
            this.obterInstituicoes()
        },
    }
}

</script>
