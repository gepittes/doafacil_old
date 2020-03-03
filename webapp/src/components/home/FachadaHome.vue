<template>
    <section>
        <v-parallax :src="imgParalax" height="550" alt="união de mãos">
            <v-flex>
                <v-container>
                    <v-row align="center" justify="center">
                        <v-col xl="6" md="12" lg="9">

                            <v-card class="elevation-0 transparent">
                                <v-card-text class="layout justify-center">
                                    <MascoteGif :width="100"/>
                                </v-card-text>
                                <v-row align="center" justify="center">
                                    <v-col lg="12">
                                        <v-card-title class="layout justify-center">
                                            <div class="font-weight-black display-1 white--text text-uppercase">
                                                Simples de <span class="red--text t-doar">doar</span>,
                                                <span class="t-facil">Fácil</span>
                                                de encontrar!
                                            </div>
                                        </v-card-title>
                                    </v-col>
                                </v-row>

                                <v-row align="center" justify="center">
                                    <v-col xl="10" md="8" lg="10">
                                        <v-card-text class="white--text">
                                            <p class="t-justify body-2 font-italic">
                                                <v-icon class="white--text">fas fa-quote-left</v-icon>
                                                Vivemos rodeados por mudanças políticas, econômicas e sociais que afetam
                                                as
                                                organizações e
                                                as pessoas. E independe de setores da economia a qual as organizações
                                                façam
                                                parte, as
                                                mudanças ressaltam a crescente importância que todas elas assumem para a
                                                sociedade
                                                contemporânea e, consequentemente, para os homens que a constituem.
                                                (COLAUTO,
                                                BEUREN; 2003).
                                                <v-icon class="white--text">fas fa-quote-right</v-icon>
                                            </p>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
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
        props: {
            imgParalax: String,
        }
    }
</script>

