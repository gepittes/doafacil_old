<template>
    <v-app>
        <b-container class="container">
            <div class="row">
                <div class="col-lg-3">
            
                    <menu-instituicao/>
        
                </div>
                <div class="col-lg-9">
               
                    <router-view/>

                </div>
            </div>
        </b-container>
    </v-app>
</template>
<script>
import MenuInstituicao from '../modules/core/MenuInstituicao'
export default {
    components: { MenuInstituicao },
    name: 'Main',
    
}
</script>
<style>

    .container {
        width: 1020px;
    }

    @media (max-width: 600px) {
        #avatar { display: none; }

    }

</style>