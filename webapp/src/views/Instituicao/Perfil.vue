<template>
    <v-container >
        <v-row >
            <v-col cols="10" lg="12" xl="12" md="12">
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <div class="cover">
                            <img
                                src="http://via.placeholder.com/1600x400"
                                alt="">
                        </div>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col cols="12">
                        <v-chip
                            color="primary"
                            label
                            class="mr-3 mt-2"
                        >
                            <h5 class="mt-2">{{ instituicao.nome }}</h5>
                        </v-chip>
                        <v-chip
                            color="light-green"
                            label
                            class="mt-2"
                        >
                            <v-icon left>fa fa-home</v-icon>
                            <span class="h-75 mt-1">Localidade: {{ instituicao.localidade }} - {{ instituicao.uf }}</span>
                        </v-chip>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-tabs
                                v-model="tab"
                                background-color="grey lighten-4"
                                centered
                                icons-and-text
                            >
                                <v-tabs-slider/>

                                <v-tab href="#tab-1">
                                    Publicações
                                    <v-icon>edit</v-icon>
                                </v-tab>

                                <v-tab href="#tab-2">
                                    Pontos de Doação
                                    <v-icon>favorite</v-icon>
                                </v-tab>

                                <v-tab href="#tab-3">
                                    Eventos
                                    <v-icon>fa fa-calendar-alt</v-icon>
                                </v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tab">

                                <v-tab-item
                                    value="tab-1"
                                >
                                    <v-card flat>
                                        <v-card-text>{{ text }}</v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item
                                    value="tab-2"
                                >
                                    <v-row justify="center" align="center">
                                        <v-col xl="3" md="5" lg="4" cols="12"
                                               v-for="ponto in pontos"
                                               :key="ponto.id"
                                        >
                                            <div class="ma-5">
                                                <PontoCard :ponto="ponto"/>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-tab-item>

                                <v-tab-item
                                    value="tab-3"
                                >
                                    <v-row justify="center" align="center">
                                        <v-col xl="3" md="5" lg="4" cols="12"
                                               v-for="evento in eventos"
                                               :key="evento.id"
                                        >
                                            <div class="ma-5">
                                                <EventoCard :evento="evento" />
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>
    </v-container>


</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';
    import EventoCard from "../../components/evento/EventoCard";
    import PontoCard from "../../components/ponto/PontoCard";


    export default {
        name: 'Perfil',
        components: {EventoCard, MenuInstituicao, PontoCard},
        data() {
            return {
                menuShow: true,
                tab: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ' +
                    'labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' +
                    ' nisi ut aliquip ex ea commodo consequat.',
            };
        },
        computed: {
            ...mapGetters({
                instituicao: 'instituicao/getInstiEncontrada',
                eventos: 'evento/getEventosInsti',
                pontos: 'ponto/ponto'
            }),
        },
        created() {
            this.obterInstituicoes();
            this.buscarInstituicoe(this.$route.params.id);
            this.obterEventosInstiuicao(this.$route.params.id);
            this.getPontoByInst(this.$route.params.id);
        },

        methods: {
            ...mapActions({
                obterInstituicoes: 'instituicao/obterInstituicoes',
                buscarInstituicoe: 'instituicao/buscartInstituicao',
                obterEventosInstiuicao: 'evento/obterEventosInstiuicao',
                getPontoByInst: 'ponto/getPontoByInst',
            }),
        },
    };
</script>

<style scoped>


    .cover img {
        width: 100%;
    }

    .cover > a {
        display: inline-block;
        color: #e44d3a;
        font-size: 16px;
        background-color: #fff;
        border: 1px solid #e44d3a;
        position: absolute;
        top: 20px;
        right: 0;
        padding: 10px 15px;
        font-weight: 600;
        margin-right: 15px;
    }

    .cover > a i {
        padding-right: 5px;
    }

</style>

