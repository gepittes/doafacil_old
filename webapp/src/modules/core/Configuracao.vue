<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>
            <v-expansion-panels
                v-model="panel"
                multiple
                focusable
                class="mt-5"
            >
                <v-expansion-panel>
                    <v-expansion-panel-header>Conta</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <meu-cadastro
                            :open-painel="openPainel"
                        />
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header>Minhas Instituicões</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="container">
                            <v-layout
                                row
                                wrap>
                                <Instituicao
                                    v-for="instituicao in instituicoes"
                                    :key="instituicao.id"
                                    :instituicao="instituicao"
                                />
                            </v-layout>
                        </div>

                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>

        </v-container>
    </v-app>
</template>
<script>
import MeuCadastro from '../conta/MeuCadastro.vue';
import {mapGetters, mapActions} from 'vuex'
import Instituicao from "../../components/instituicao/Instituicao";

export default {
    name: 'Configuracao',
    components: {Instituicao, MeuCadastro },
    data() {
        return {
            panel: [],
        };
    },

    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
            accountInfo: 'account/accountInfo'
        }),
    },

    methods: {
        ...mapActions({
            obterInstiUser: 'instituicao/obterInstiUser',
        }),

        openPainel(value) {
            this.panel = value;
        },
    },
    created() {
        this.obterInstiUser(this.accountInfo.user_id);
    },


};
</script>

