<template>
    <section>
        <v-container>
            <v-layout align-center justify-center column fill-height class="m-3">
                <div class="headline">Deseja receber notícias de novas instituições?!</div>
                <div>Basta preencher o formulário que encaminharemos sempre que houver novidades.</div>
            </v-layout>

            <v-layout align-center justify-center fill-height>
                <v-flex xl3>
                    <v-text-field filled label="Email" :rules="emailRules" v-model="email"
                                  hint="Insira seu e-mail" persistent-hint></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout align-center justify-center fill-height>
                <v-flex xl3>
                    <v-textarea filled label="Deixe sua sugestão...."/>
                </v-flex>
            </v-layout>

            <v-layout align-center justify-center fill-height>
                <v-btn class="blue lighten-2 mb-5" dark large>Enviar</v-btn>
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
                        return !!v || "E-mail é obrigadtorio";
                    },
                    v =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "E-mail está inválido"
                ],
            }
        }
    }
</script>