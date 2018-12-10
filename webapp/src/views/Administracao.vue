<template>
    <v-container fluid>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Adminstração</v-toolbar-title>
            </v-toolbar>
            <v-card-text height="200px">
                <!--<component :is=""-->
                <router-view />
            </v-card-text>
        </v-card>

        <v-bottom-nav
                :active.sync="bottomNav"
                :color="color"
                :value="true"
                absolute
                shift>
            <v-btn dark value="/plataforma" to="/plataforma">
                <span>Plataformas</span>
                <v-icon>devices</v-icon>
            </v-btn>

            <v-btn dark value="/sistema" to="/sistema">
                <span>Sistemas</span>
                <v-icon>settings_system_daydream</v-icon>
            </v-btn>

            <v-btn dark value="/mensagem" to="/mensagem">
                <span>Mensagens</span>
                <v-icon>chat</v-icon>
            </v-btn>

            <v-btn dark value="/conta" to="/conta">
                <span>Contas</span>
                <v-icon>account_circle</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-container>

</template>

<script>


    export default {
        data() {
            return {
                bottomNav: '/plataforma'
            }
        },

        computed: {
            color() {
                switch (this.bottomNav) {
                    case '/plataforma':
                        return 'blue-grey'
                    case '/sistema':
                        return 'teal'
                    case '/mensagem':
                        return 'brown'
                    case '/conta':
                        return 'indigo'
                }
            }
        }
    }
</script>
