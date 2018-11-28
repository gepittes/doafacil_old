<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-layout column justify-center>
                    <v-card dark class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Chat (WebSocket)</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form @submit="sendMessage">
                                <v-text-field
                                        v-model="sistema"
                                        label="Sistema"
                                        required></v-text-field>
                                <v-text-field
                                        v-model="usuario"
                                        :counter="15"
                                        label="Usuario"
                                        required></v-text-field>
                                <v-textarea
                                        solo
                                        v-model="mensagem"
                                        label="mensagem"
                                        ref="mensagem"
                                        required></v-textarea>
                                <v-flex xs12>
                                    <div style="display: inline" ref="mensagem-completa">
                                        <span v-if="sistema != ''" style="color:dodgerblue">[{{sistema}}]</span>
                                        <span v-if="usuario != ''" style="color:dodgerblue">{{usuario}}:</span>
                                        <span v-if="mensagem != ''" style="color:yellowgreen">{{mensagem}}</span>
                                    </div>
                                </v-flex>
                                <v-btn light color="primary" v-if="isEnviando == false" @click="sendMessage">
                                    Enviar
                                </v-btn>
                                <v-progress-circular v-if="isEnviando == true"
                                                     indeterminate
                                                     color="green"></v-progress-circular>

                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>

    </v-container>


</template>

<script>
    export default {
        name: "WebSocket",
        data() {
            return {
                isEnviando: false,
                usuario: "",
                sistema: "",
                mensagem: "",
                websocket: {
                    connection: new WebSocket('ws://localhost:8001')
                }
            }
        },
        methods: {
            sendMessage(e) {
                // console.log(this.$refs['botaoEnviar'].hide);

                let base = this;
                base.isEnviando = true;

                setTimeout(function () {
                    base.isEnviando = false;
                }, 1000)
                this.websocket.connection.send(this.sistema + '|' + this.usuario + ':' + this.mensagem);
                e.preventDefault();

                this.$refs['mensagem'].reset();
            }
        },
        created() {
            this.websocket.connection = new WebSocket('ws://localhost:8001');

            this.websocket.connection.onopen = function (e) {
                console.log("Conexão estabelecida " + e);
            }

            this.websocket.connection.onmessage = function (e) {
                console.log(e.data);
            }
        }
    }
</script>

<style scoped>

</style>
