<template>
    <section>
        <v-parallax :src="imgParalax" height="550" alt="união de mãos">
            <v-flex xs12>
                <v-container grid-list-xl>
                    <v-layout align-center justify-center row>
                        <v-flex xs12 md5>
                            <v-card class="elevation-0 transparent">
                                <v-card-text class="text-xs-center layout justify-center">
                                    <MascoteGif width="100"/>
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
                                        contemporânea e, consequentemente, para os homens que a constituem.
                                        (COLAUTO,
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
    
</template>

<script>
    import MascoteGif from '../../components/genericos/MascoteGif.vue'

    export default {
        name: "FachadaHome",
        components: {MascoteGif},
        props:{
            imgParalax: String,
        }
    }
</script>

