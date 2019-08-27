<template>
    <v-app>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <Instituicao
                    v-for="instituicao in instituicoesIniciais" :key="instituicao.id"
                    :instituicao="instituicao"
                />
            </v-layout>
        </v-container>

        <v-btn
            fab
            color="success"
            dark
            fixed
            bottom
            right
            @click="openDialog()">
            <v-icon>add</v-icon>
        </v-btn>

        <InstituicaoFormulario/>

    </v-app>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import InstituicaoFormulario from './InstituicaoFormulario'
    import Perfil from './Perfil'
    import Instituicao from './Instituicao'

    export default {
        name: 'ListarInstituicoes',
        components: {InstituicaoFormulario, Perfil, Instituicao},
        data() {
            return {
                votos: 3,
                instituicoesIniciais: [],
                instituicao: {},
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
                dialog: 'instituicao/getDialog'
            }),
        },
        created() {
            this.obterInstituicoes();
        },
        methods: {
            ...mapActions({
                obterInstituicoes: 'instituicao/obterInstituicoes',
                removerInstituicao: 'instituicao/removerInstituicao',
                statusDialog: 'instituicao/setDialog'
            }),
            openDialog() {
                this.statusDialog(true)
            }
        }
    }

</script>
