<template>
    <section>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 text-xs-center class="mt-5">
                    <div class="headline">Deseja receber noticias de nova instituições?!</div>
                    <br>
                    <div>Basta preencher o formulário que encaminharemos sempre que houver novidades.</div>
                </v-flex>
                <v-flex xs8 offset-xs2>

                    <v-card class="elevation-0 transparent">

                        <v-card-text>
                            <v-flex xs12>
                                <v-text-field box label="Email address" :rules="emailRules" v-model="email"
                                              hint="Enter your email!" persistent-hint></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field box multi-line label="Bio and curiosities"></v-text-field>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center">
                                <v-btn class="blue lighten-2 mb-5" dark large>Enviar</v-btn>
                            </v-flex>
                        </v-card-text>

                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </section>
</template>

<script>
    export default {
        name: "NewsLetter",
        data() {
            return {
                email: '',
                emailRules: [
                    v => {
                        return !!v || "E-mail is required";
                    },
                    v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "E-mail must be valid"
                ],
            }
        }
    }
</script>