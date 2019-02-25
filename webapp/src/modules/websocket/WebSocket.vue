<template>
    <v-container
        fluid
        fill-height>
        <v-layout
            align-center
            justify-center>
            <v-flex
                xs12
                sm8
                md4>
                <v-layout
                    column
                    justify-center>
                    <v-card
                        dark
                        class="elevation-12">
                        <v-toolbar
                            dark
                            color="primary">
                            <v-toolbar-title>Chat (WebSocket)</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form @submit="sendMessage">
                                <v-text-field
                                    v-model="sistema"
                                    label="Sistema"
                                    required/>
                                <v-text-field
                                    v-model="usuario"
                                    :counter="15"
                                    label="Usuario"
                                    required/>
                                <v-textarea
                                    ref="mensagem"
                                    v-model="mensagem"
                                    solo
                                    label="mensagem"
                                    required/>
                                <v-flex xs12>
                                    <div
                                        ref="mensagem-completa"
                                        style="display: inline">
                                        <span
                                            v-if="sistema != ''"
                                            style="color:dodgerblue">[{{ sistema }}]</span>
                                        <span
                                            v-if="usuario != ''"
                                            style="color:dodgerblue">{{ usuario }}:</span>
                                        <span
                                            v-if="mensagem != ''"
                                            style="color:yellowgreen">{{ mensagem }}</span>
                                    </div>
                                </v-flex>
                                <v-btn
                                    v-if="isEnviando == false"
                                    light
                                    color="primary"
                                    @click="sendMessage">
                                    Enviar
                                </v-btn>
                                <v-progress-circular
                                    v-if="isEnviando == true"
                                    indeterminate
                                    color="green"/>

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
    name: 'WebSocket',
    data() {
        return {
            isEnviando: false,
            usuario: '',
            sistema: '',
            mensagem: '',
            websocket: {
                connection: new WebSocket('ws://localhost:8001'),
            },
        };
    },
    created() {
        this.websocket.connection = new WebSocket('ws://localhost:8001');

        this.websocket.connection.onopen = function (e) {
            console.log(`Conexão estabelecida ${e}`);
        };

        this.websocket.connection.onmessage = function (e) {
            console.log(e.data);
        };
    },
    methods: {
        sendMessage(e) {
            // console.log(this.$refs['botaoEnviar'].hide);

            const base = this;
            base.isEnviando = true;

            setTimeout(() => {
                base.isEnviando = false;
            }, 1000);
            this.websocket.connection.send(`${this.sistema}|${this.usuario}:${this.mensagem}`);
            e.preventDefault();

            this.$refs.mensagem.reset();
        },
    },
};
</script>

<style scoped>

</style>
