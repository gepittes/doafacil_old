<template>
    <div id="perfil">
        <h1>perfil</h1>
        
         <p><strong>Id: {{ id }}</strong></p>
         <router-link tag="button" primario :to="`/usuario/${id}/editar`">
         </router-link>

        {{ instituicao }}
<!--        {{ instituicoes }}-->

    </div>
</template>
<script>

    import { mapGetters } from 'vuex'
export default {
    props: ['id'],
    data() {
        return {
            instituicao: {}
        }
    },
    computed: {
        ...mapGetters({
            instituicoes: 'instituicao/instituicao',
        }),
    },
    created() {
        console.log(instituicoes.find(e => e.id  === this.id ))
        // this.instituicao = instituicoes.find(e => e.id  === this.id )
    }

}
</script>
