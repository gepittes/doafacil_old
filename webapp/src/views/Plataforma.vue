<template>
    <v-container fluid>
        <v-layout
                column
                justify-center
        >
            <v-card flat>
                <v-subheader>Plataformas</v-subheader>

                <v-expansion-panel popout>
                    <v-expansion-panel-content
                            v-for="(plataforma, i) in plataformas"
                            :key="i"
                            hide-actions>
                        <v-layout
                                slot="header"
                                align-center
                                row
                                spacer>

                            <v-flex md1>
                                <strong v-html="plataforma.plataforma_id"></strong>
                            </v-flex>

                            <v-flex m7 no-wrap>
                                <strong v-html="plataforma.descricao"></strong>
                            </v-flex>

                            <v-flex m2 :class="{
                                'red--text': !plataforma.is_ativo,
                                'blue--text': plataforma.is_ativo,
                            }"
                                    ellipsis
                                    hidden-sm-and-down>
                                {{ plataforma.is_ativo ? "Ativo" : "Inativo" }}
                            </v-flex>
                            <v-flex md2>
                                <v-tooltip top>
                                    <v-btn fab dark small color="indigo" slot="activator">
                                        <v-icon dark>create</v-icon>
                                    </v-btn>
                                    <span>Editar</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <v-btn fab dark small color="cyan" slot="activator">
                                        <v-icon dark>delete</v-icon>
                                    </v-btn>
                                    <span>Remover</span>
                                </v-tooltip>
                            </v-flex>
                        </v-layout>

                        <v-card>
                            <v-divider></v-divider>
                            <v-card-text v-text="lorem"></v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-layout>
        <!--<v-card id="create">-->
        <!--<v-speed-dial>-->
        <!--<v-btn slot="activator"-->
        <!--v-model="false"-->
        <!--color="blue darken-2"-->
        <!--dark-->
        <!--fab>-->
        <!--<v-icon>account_circle</v-icon>-->
        <!--<v-icon>close</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn fab-->
        <!--dark-->
        <!--small-->
        <!--color="green">-->
        <!--<v-icon>edit</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn fab-->
        <!--dark-->
        <!--small-->
        <!--color="indigo">-->
        <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn fab-->
        <!--dark-->
        <!--small-->
        <!--color="red">-->
        <!--<v-icon>delete</v-icon>-->
        <!--</v-btn>-->
        <!--</v-speed-dial>-->
        <!--</v-card>-->
        <!--<v-btn-->
        <!--absolute-->
        <!--dark-->
        <!--fab-->
        <!--botto-->
        <!--right-->
        <!--color="pink"-->
        <!--&gt;-->
        <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
    </v-container>

</template>
<script>

    import axios from 'axios'

    export default {
        data: () => ({
            bottomNav: 'recent',
            plataformas: [
                // {
                //     avatar: 'https://cdn.icon-icons.com/icons2/936/PNG/512/mobile-phone_icon-icons.com_73484.png',
                //     name: 'Celular',
                //     title: 'Celular Título',
                //     excerpt: 'Celular descrição'
                // },
                // {
                //     avatar: 'https://image.flaticon.com/icons/svg/49/49918.svg',
                //     name: 'Web',
                //     title: 'Web Título',
                //     excerpt: 'Web descrição'
                // },
                // {
                //     color: 'red',
                //     icon: 'people',
                //     name: 'Email',
                //     new: 1,
                //     total: 3,
                //     title: 'Email Título'
                // },
            ],
            lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
        }),
        created() {
            this.buscarPlataformas()
        },
        methods: {
            buscarPlataformas() {
                axios.get('http://localhost/v1/plataforma')
                    .then(response => {
                        const data = response.data;
                        this.plataformas = data.data;
                    })
                    // .then(response => (this.info = response.data.bpi))
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => this.loading = false)
            },
            obterClasseAtiva() {

            }
        }
    }


    // import axios from 'axios'
    //
    // export default {
    //     data () {
    //         return {
    //             info: null,
    //             loading: true,
    //             errored: false
    //         }
    //     },
    //     filters: {
    //         currencydecimal (value) {
    //             return value.toFixed(2)
    //         }
    //     },
    //     mounted () {
    //         axios
    //             .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    //             .then(response => (this.info = response.data.bpi))
    //             .catch(error => {
    //                 console.log(error)
    //                 this.errored = true
    //             })
    //             .finally(() => this.loading = false)
    //     }
    // }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
