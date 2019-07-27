<template>
    <v-app>
        <template v-if="status.loggedIn">
            <barra-lateral/>
        </template>

            <Toolbar/>

        <v-content>
            <alerta
                    v-if="alert.message != null && alert.message_type != null"
                    :color="alert.message_type"
            >{{ alert.message }}
            </alerta>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>

    import {mapState, mapActions, mapGetters} from 'vuex';
    import Toolbar from './components/template/Toolbar'
    import BarraLateral from './modules/core/BarraLateral.vue';
    import Alerta from './modules/alert/Alerta.vue';

    export default {
        name: 'App',
        components: {
            BarraLateral,
            Alerta,
            Toolbar
        },

        computed: {
            ...mapState({
                alert: state => state.alert,
                // isLoggedIn: state => state.isLoggedIn
                // status: state => state.status
            }),
            ...mapGetters({
                status: 'account/status',
                user: 'account/user',
                accountInfo: 'account/accountInfo',
            }),
            // user() {
            //     return this.$store.state.account.status.loggedIn
            // }
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear',
            }),
        },
    };
</script>
