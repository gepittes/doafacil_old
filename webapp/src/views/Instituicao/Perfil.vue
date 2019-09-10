<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col xl="10" class="py-0">
                <div class="cover">
                    <img
                        src="http://via.placeholder.com/1600x400"
                        alt="">
                </div>
                <div class="row">
                    <div class="col-lg-12">
                            <h3>{{ instituicao.nome }}</h3>
                            <div class="mb-3">
                                <span>Localidade: {{ instituicao.localidade }} - {{ instituicao.uf }}</span>
                            </div>
                            <v-card>
                                <v-tabs
                                    v-model="tab"
                                    background-color="grey lighten-4"
                                    centered
                                    icons-and-text
                                >
                                    <v-tabs-slider/>

                                    <v-tab href="#tab-1">
                                        publicações
                                        <v-icon>edit</v-icon>
                                    </v-tab>

                                    <v-tab href="#tab-2">
                                        Ponto de Doação
                                        <v-icon>favorite</v-icon>
                                    </v-tab>

                                    <v-tab href="#tab-3">
                                        Eventos
                                        <v-icon>account_box</v-icon>
                                    </v-tab>
                                </v-tabs>

                                <v-tabs-items v-model="tab">
                                    <v-tab-item
                                        v-for="i in 3"
                                        :key="i"
                                        :value="'tab-' + i"
                                    >
                                        <v-card flat>
                                            <v-card-text>{{ text }}</v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>
                            </v-card>
                        </div>
                    </div>
            </v-col>
        </v-row>
    </v-container>


</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';


export default {
    name: 'PerfilInstituicao',
    components: { MenuInstituicao },
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
        }),
    },
    created() {
        this.obterInstituicoes();
        this.buscarInstituicoe(this.$route.params.id);
    },

    methods: {
        ...mapActions({
            obterInstituicoes: 'instituicao/obterInstituicoes',
            buscarInstituicoe: 'instituicao/buscartInstituicao',
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

