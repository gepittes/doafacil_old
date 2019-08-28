<template>
    <v-app>
            <v-container fluid grid-list-md>
                <div class="row">
                    <div class="col-lg-3">
                
                        <menu-instituicao/>
            
                    </div>
                    <div class="col-lg-9 ">
                        <v-layout row wrap>
                            <Instituicao
                                v-for="instituicao in instituicoesIniciais" 
                                :key="instituicao.id"
                                :instituicao="instituicao"
                            />
                        </v-layout>
                    </div>
                    
                </div>
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
            </v-container>

            <InstituicaoFormulario/>
    </v-app>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import MenuInstituicao from '../../modules/core/MenuInstituicao'
    import InstituicaoFormulario from './InstituicaoFormulario'
    import Perfil from './Perfil'
    import Instituicao from './Instituicao'

    export default {
        components: { InstituicaoFormulario, Perfil, Instituicao, MenuInstituicao },
        name: 'ListarInstituicoes',
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
<style>

    .container {
        width: 1020px;
    }

    @media (max-width: 600px) {
        #avatar { display: none; }

    }
 
</style>