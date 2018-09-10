<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
                <blockquote>
                    <div class="hello">
                        <h1>WebSocket</h1>
                        <form>
                            <input v-model="message" placeholder="Me edite">
                        </form>
                    </div>
                    <footer>

                    </footer>
                </blockquote>
            </v-layout>
        </v-slide-y-transition>
    </v-container>


</template>

<script>
    export default {
        name: "WebSocket",
        data() {
            return {
                message: "",
                websocket: {
                    connection: new WebSocket('ws://localhost:8001')
                }

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
