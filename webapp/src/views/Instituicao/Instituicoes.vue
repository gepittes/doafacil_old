<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>

                <v-layout
                    row
                    wrap>
                    <Instituicao
                        v-for="instituicao in instituicoesIniciais"
                        :key="instituicao.id"
                        :instituicao="instituicao"
                    />
                </v-layout>
        
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
import { mapActions, mapGetters } from 'vuex';
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';
import InstituicaoFormulario from '../../components/instituicao/InstituicaoFormulario.vue';
import Perfil from './Perfil.vue';
import Instituicao from '../../components/instituicao/Instituicao.vue';

export default {
    name: 'ListarInstituicoes',
    components: {
        InstituicaoFormulario, Perfil, Instituicao, MenuInstituicao,
    },
    data() {
        return {
            votos: 3,
            instituicoesIniciais: [],
            instituicao: {},
        };
    },
    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
            dialog: 'instituicao/getDialog',
            accountInfo: 'account/accountInfo'
        }),
    },
    watch: {
        instituicoes(value) {
            if ('error' in value) {
                this.instituicoesIniciais = {};
            } else {
                this.instituicoesIniciais = value;
            }
        },
    },

    created() {
        this.obterInstiUser(this.accountInfo.user_id);
    },
    methods: {
        ...mapActions({
            obterInstiUser: 'instituicao/obterInstiUser',
            statusDialog: 'instituicao/setDialog',
        }),
        openDialog() {
            this.statusDialog(true);
        },
    },
};

</script>

