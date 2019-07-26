<template>
    <v-app light>
        <section>
            <v-parallax :src="images.main" height="500" alt="união de mãos">
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout align-center justify-center row>
                            <v-flex xs12 md5>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center layout justify-center">
                                        <v-img :src="images.logoGif" :max-width="100"/>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="font-weight-black display-1 text-xs-center white--text text-uppercase">
                                            Simples de <span class="red--text t-doar">doar</span>,
                                            <span class="t-facil">Fácil</span>
                                            de encontrar!
                                        </div>
                                    </v-card-title>
                                    <v-card-text class="white--text">
                                        <p class="t-justify body-2 font-italic">
                                            <v-icon class="white--text">fas fa-quote-left</v-icon>
                                            Vivemos rodeados por mudanças políticas, econômicas e sociais que afetam as
                                            organizações e
                                            as pessoas. E independe de setores da economia a qual as organizações façam
                                            parte, as
                                            mudanças ressaltam a crescente importância que todas elas assumem para a
                                            sociedade
                                            contemporânea e, consequentemente, para os homens que a constituem. (COLAUTO,
                                            BEUREN; 2003).
                                            <v-icon class="white--text">fas fa-quote-right</v-icon>
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center justify-center row>
                            <router-link tag="v-btn" class="red darken-1 white--text text-uppercase" to="/login">
                                <v-icon class="mr-1">fas fa-people-carry</v-icon>
                                QUERO DOAR!
                            </router-link>
                            <router-link tag="v-btn" class="blue darken-1 white--text text-uppercase" to="/login">
                                QUERO RECEBER!
                                <v-icon class="ml-1">fas fa-hands-helping</v-icon>
                            </router-link>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-parallax>
        </section>

        <InfoCards/>

        <section>
            <v-parallax :src="images.main" height="380">
                <v-layout column align-center justify-center>
                    <div class="headline white--text mb-3 text-xs-center">Endorfine is a social network that allows
                        everyone to reach a huge audience with a tap
                    </div>
                    <em>With the power of Endorfine you don't need to be famous or post pics of cute cats in order to
                        get visibility</em>
                    <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                        Get more info
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs12 text-xs-center class="mt-5">
                        <div class="headline">Are you amazed? Stay tuned!</div>
                        <br>
                        <div>We are lunching the beta in a few time. If you want to be one of the first Endorfine users
                            we will email you as soon as we're ready. In the beginning only few people will test before
                            the launch. Let us know how Endorfine will help you!
                        </div>
                    </v-flex>
                    <v-flex xs8 offset-xs2>

                        <v-card class="elevation-0 transparent">

                            <v-card-text>
                                <v-flex xs12 v-if="!subscribed">
                                    <v-text-field box label="Email address" :rules="emailRules" v-model="email"
                                                  hint="Enter your email!" persistent-hint></v-text-field>
                                </v-flex>
                                <v-flex xs12 v-if="!subscribed">
                                    <v-text-field box multi-line label="Bio and curiosities"></v-text-field>
                                </v-flex>
                                <v-flex xs12 class="text-xs-center" >
                                    <v-btn class="blue lighten-2 mb-5" dark large >Get in touch
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 class="text-xs-center" v-if="subscribed">
                                    <v-btn class="green lighten-2 mb-5" dark large>Welcome on board!</v-btn>
                                </v-flex>
                            </v-card-text>

                        </v-card>

                    </v-flex>
                </v-layout>
            </v-container>
        </section>

        <section>
            <v-parallax :src="images.main" height="380">
                <v-layout column align-center justify-center>
                    <div class="headline white--text mb-3 text-xs-center">We are dropping cool news and opportunities on
                        socials
                    </div>
                </v-layout>
                <v-layout justify-space-around justify-center>

                    <v-icon x-large dark>fab fa-facebook-f</v-icon>

                    <v-icon x-large dark>fab fa-twitter</v-icon>

                    <v-icon x-large dark>fab fa-reddit-alien</v-icon>

                    <v-icon x-large dark>fab fa-instagram</v-icon>

                    <v-icon x-large dark>fab fa-discord</v-icon>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Company info</div>
                            </v-card-title>
                            <v-card-text>
                                We are not a company. We hate companies. Just imagine us like the guys from the Silicon
                                Valley series.
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4 offset-sm1>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">We are hiring</div>
                            </v-card-title>
                            <v-card-text>
                                Are you a creative person? Do you like techy stuff? Complete the email form by writing
                                your skills and interests
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>

        <section>
            <v-container>
                <v-layout>
                    <v-flex xs12 class="text-xs-center">
                        <img height="200px" :src="images.logo" alt="Doa Facil Logomarca">
                    </v-flex>
                </v-layout>
            </v-container>
        </section>


        <v-footer class="blue darken-2">
            <v-layout row wrap align-center>
                <v-flex xs12 class="text-xs-center">
                    <div class="white--text ml-3">
                        Grupo
                        <v-icon class="white--text">supervised_user_circle</v-icon>
                        GEPITTES
                    </div>
                </v-flex>
            </v-layout>
        </v-footer>

    </v-app>
</template>

<script>
    import InfoCards from '../../modules/home/InformacoesCards.vue'

    export default {
        name: "Home",
        data: function () {
            return {
                images: {
                    main: require('../../assets/home/union-hands.jpg'),
                    logo: require('../../assets/doafacil/logos/logo-doafacil.png'),
                    logoGif: require('../../assets/doafacil/gifs/hand-gif.gif')
                },
                email: "",
                emailRules: [
                    v => {
                        return !!v || "E-mail is required";
                    },
                    v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "E-mail must be valid"
                ],
                subscribed: false
            };
        },

        components: {InfoCards},

        methods: {
            subscribe: function () {
                this.subscribed = !this.subscribed;
            }
        },

        computed: {
            imgHeight: function () {
                var offset = 320;
                console.log("new image height is " + (this.pageHeight - offset));
                return this.pageHeight - offset;
            }
        },

        mounted: function () {
            // this.calculateHeight();
        }
    };
</script>

