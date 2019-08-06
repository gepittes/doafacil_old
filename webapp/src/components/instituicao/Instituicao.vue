<template>
    <v-flex class="pr-3 pb-3" xs12 md8 lg6>
        <v-card b-col sm="4">
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ instituicao.nome }}</div>
                    <p ma-1 class="grey--text">Cidade: {{ instituicao.localidade }}</p>
                    <p ma-1 class="grey--text">Estado: {{ instituicao.uf }}</p>
                    <p ma-1 class="grey--text">Membro desde: {{ instituicao.created_at }}</p>
                </div>
            </v-card-title>
            <div class="text-sm-left">
                <v-rating v-model="votos"></v-rating>
            </div>
            <v-card-actions>
                <v-btn  icon :to="`/instituicao/${instituicao.id}`">
                    <v-icon>
                        store
                    </v-icon>
                </v-btn>
                <v-btn  icon>
                    <v-icon >
                        share
                    </v-icon>
                </v-btn>
                <v-btn  icon>
                    <v-icon  color="warning" @click="excluirInstituicao(instituicao.id)">delete</v-icon>
                </v-btn>

                <v-btn  icon>
                    <v-icon  left color="info" @click="editarInstituicao(instituicao)">edit </v-icon>
                </v-btn>
                <v-btn  icon>
                    <v-icon >
                        thumb_up
                    </v-icon>
                </v-btn>
                <v-btn  icon>
                    <v-icon >
                        thumb_down
                    </v-icon>
                </v-btn>
            </v-card-actions>
            <v-dialog v-model="dialog" max-width="700px">
                <v-card light>
                    <v-card-text>
                        <v-toolbar color="primary">
                            <v-toolbar-title>Atualizar Instituição</v-toolbar-title>
                        </v-toolbar>
                        <Criar :instituicaoEditar="instituicaoEditar" :dialog.sync="dialog"/>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card>
    </v-flex>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Instituicoes from './Instituicoes';
    import Criar from './InstituicaoFormulario';
    import Perfil from './Perfil';

    export default {
        name: 'Instituicao',
        components: {
            Criar,
            Perfil,
            Instituicoes
        },
        props: ['instituicao'],
        data() {
            return {
                votos: 3,
                instituicaoEditar: {},
                dialog: false,
            };
        },
        computed: {
            ...mapGetters({
                instituicoes: 'instituicao/instituicao',
            }),
        },
        created() {
            this.obterInstituicoes();
        },
        methods: {
            ...mapActions({
                obterInstituicoes: 'instituicao/obterInstituicoes',
                removerInstituicao: 'instituicao/removerInstituicao',
            }),
            excluirInstituicao(id) {
                this.removerInstituicao(id);
            },
            editarInstituicao(instituicao) {
                this.instituicaoEditar = { ...instituicao };
                this.dialog = true;
            },

        }
    };
</script>

<style scoped>

</style>