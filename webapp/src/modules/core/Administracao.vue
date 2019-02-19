<template>
    <v-container fluid>
        <v-card>
            <v-tabs light
                    centered
                    color="blue darken-1"
                    dark
                    icons-and-text
                    slider-color="warning"
                    grow>
                <v-tab dark to="/administracao/plataforma">
                    Plataformas
                    <v-icon>devices</v-icon>
                </v-tab>

                <v-tab dark to="/administracao/sistema">
                    Sistemas
                    <v-icon>settings_system_daydream</v-icon>
                </v-tab>

                <v-tab dark to="/administracao/mensagem">
                    Mensagens
                    <v-icon>chat</v-icon>
                </v-tab>

                <v-tab dark to="/administracao/conta">
                    Contas
                    <v-icon>account_circle</v-icon>
                </v-tab>
            </v-tabs>
            <v-card-text heigth="300px">
                <!--<component :is=""-->
                <router-view/>
            </v-card-text>
        </v-card>


    </v-container>

</template>

<script>


export default {
  data() {
    return {
      bottomNav: '/plataforma',
    };
  },

  computed: {
  },
};
</script>
