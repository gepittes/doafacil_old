<template>
    <v-app>
        <v-container fluid grid-list-md>
            <div class="row">
                <div class="col-lg-3">

                    <menu-instituicao/>

                </div>
                <div class="col-lg-9 ">
                    <v-layout row wrap>
                            <h1>Listar Card de ponto de doação</h1>
                    </v-layout>
                </div>
            </div>
            
        </v-container>    
    </v-app>
</template>
<script>
    import MenuInstituicao from '../../modules/core/MenuInstituicao'

    export default {
        components: { MenuInstituicao },
        name: 'PontoDeDoacao',
  
    }

</script>