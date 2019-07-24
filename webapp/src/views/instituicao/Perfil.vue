<template>
    <div id="perfil">
        <h1>perfil</h1>
        
         <p><strong>Id: {{ id }}</strong></p>
         <router-link tag="button" primario :to="`/usuario/${id}/editar`">
     
         </router-link>
         {{instituicaoEditar}}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['instituicaoEditar'],
    data: () => ({
        loading: false,
        editedItem: {},
        defaultItem: {
            id: 'null',
        },
    }),
    computed: {
        ...mapGetters({
        }),

    },
      mounted() {
        this.editedItem = Object.assign({}, this.defaultItem);
    },

    methods: {
            ...mapActions({
                    atualizarInstituicao: 'instituicao/atualizarInstituicao',
            }),
    },   
}
</script>
