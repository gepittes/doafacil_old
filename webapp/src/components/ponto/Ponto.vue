<template>
    <v-flex md4 sm6 xl3>
        <v-card
            class="mx-auto"
            max-width="400"
        >
            <v-img
            class="white--text"
            height="200px"
            src="http://via.placeholder.com/400x280"
            >
            <v-card-title class="align-end fill-height" v-text="ponto.nome"></v-card-title>
            </v-img>

            <v-card-text>
            <span class="text--primary">
                <span>Criado por: <strong v-text="ponto.nome"></strong></span><br>
    
            </span>
            </v-card-text>

            <v-card-actions>
            <v-row fluid justify="center" align="center">
                <v-btn small :to="`/ponto/${ponto.id}`" icon>
                    <v-icon>
                        fa fa-eye
                    </v-icon> 
                </v-btn>
                <v-btn small icon>
                    <v-icon>
                        share
                    </v-icon>    
                </v-btn>    
            </v-row>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: 'Ponto',
        props: ['ponto']
        
    };
</script>