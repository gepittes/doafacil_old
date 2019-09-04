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
        </v-container>
    </v-app>
</template>
<script>
import AppBar from '../../modules/core/AppBar'
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';


export default {
    name: 'Main',
    components: { MenuInstituicao, AppBar },
    
};
</script>



