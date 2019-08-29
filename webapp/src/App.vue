<template>
    <v-app>


       <App-bar/>

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
    import AppBar from './modules/core/AppBar';
    import Alerta from './modules/alert/Alerta.vue';

    export default {
        name: 'App',
        components: {
            Alerta,
            AppBar
        },

        computed: {
            options() {
                return {
                    duration: 1300,
                    offset: 0,
                    easing: 'easeInOutCubic',
                };
            },
            ...mapState({
                alert: state => state.alert
                // isLoggedIn: state => state.isLoggedIn
                // status: state => state.status
            }),

        },
        mounted() {
            this.loading = true;
        },
        methods: {
            ...mapActions({
                clearAlert: 'alert/clear'
            })
        }
    };
</script>
