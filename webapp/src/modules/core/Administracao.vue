<template>
    <v-container fluid>
        <v-card>
            <v-tabs
                light
                centered
                color="blue darken-1"
                dark
                icons-and-text
                slider-color="warning"
                grow>

                <v-tab
                    dark
                    to="/administracao/conta">
                    Contas
                    <v-icon>account_circle</v-icon>
                </v-tab>
            </v-tabs>
            <v-card-text heigth="300px">
                <router-view/>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            bottomNav: '/conta',
        };
    },

    computed: {
        ...mapGetters({
            accountInfo: 'account/accountInfo',
        }),
    },

    mounted() {
        if (this.accountInfo.is_admin !== true) {
            this.$store.dispatch('alert/error', 'Usuário sem privilégios administrativos.', { root: true });
            this.$router.push({ name: 'home' });
        }
    },
};
</script>
