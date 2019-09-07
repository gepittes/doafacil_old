<template>
    <v-app>
        <app-bar class="mb-5"/>
        <v-container class="mt-4">
            <v-row justify="center">
                <v-col cols="3" 
                md="2"
                class="pa-0">
                    <!-- <v-col 
                    class="user-pro-img"
                    justify="center"
                    
                    >
                        <img
                            src="http://via.placeholder.com/170x170"
                            alt="">
                    </v-col> -->
                    <menu-instituicao :show-avatar="false"/>
                </v-col>
                <v-col cols="9" 
                md="10"
                class="pa-0 mb-2"
                >
                    <router-view/>
                </v-col>
            </v-row>
            <alerta
                v-if="alert.message != null && alert.message_type != null"
                :color="alert.message_type"
            >{{ alert.message }}
            </alerta> 
        </v-container>
    </v-app>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex';
import AppBar from '../../modules/core/AppBar'
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';
import Alerta from '../../modules/alert/Alerta.vue';


export default {
    name: 'Main',
    components: { 
        MenuInstituicao, 
        Alerta,
        AppBar},
    computed: {
        options() {
            return {
                duration: 1300,
                offset: 0,
                easing: 'easeInOutCubic',
            };
        },
        ...mapState({
            alert: state => state.alert,
            // isLoggedIn: state => state.isLoggedIn
            // status: state => state.status
        }),

    },
    mounted() {
        this.loading = true;
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear',
        }),
    },
    
};
</script>



