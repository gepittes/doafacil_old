<template>
    <v-app>
        <v-container
            fluid
            grid-list-md>
    
            <v-layout
                row
                wrap>
                <h1>Listar Card de ponto de doação</h1>
            </v-layout>

        </v-container>
    </v-app>
</template>
<script>
import MenuInstituicao from '../../modules/core/MenuInstituicao.vue';

export default {
    name: 'PontoDeDoacao',
    components: { MenuInstituicao },

};

</script>
