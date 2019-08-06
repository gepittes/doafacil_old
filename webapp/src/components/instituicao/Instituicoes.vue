<template>
    <v-app>
            <v-layout row wrap>
                <Instituicao v-for="instituicao in instituicoesIniciais" :key="instituicao.id" :instituicao="instituicao" />
            </v-layout>

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

                <v-dialog
                        v-model="dialog"
                        max-width="700px">
                    <v-card light>
                        <v-card-text>
                            <v-toolbar
                                    dark
                                    color="primary">
                                <v-toolbar-title>Cadastrar nova Instituição</v-toolbar-title>
                            </v-toolbar>
                            <InstituicaoFormulario :dialog.sync="dialog"/>
                        </v-card-text>
                    </v-card>
                </v-dialog>
    </v-app>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import InstituicaoFormulario from './InstituicaoFormulario'
    import Perfil from './Perfil'
    import Instituicao  from './Instituicao'

    export default {
        components: { InstituicaoFormulario, Perfil, Instituicao },
        data(){
            return {
                votos: 3,
                instituicoesIniciais: [],
                instituicao: {},
                dialog: false,
            }
        },
        watch: {
            instituicoes(value) {
                if ('error' in value) {
                    alert(value.error);
                    this.instituicoesIniciais = {}
                } else {
                    this.instituicoesIniciais = value;
                }
            },
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
        }
    }

</script>
