<template>
    <v-container fluid>
        <v-layout column justify-center>
            <v-card flat>
                <section>
                    <router-link to="/">Home</router-link>
                    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
                    <a href="#" v-if="isLoggedIn" @click="logout">Logout</a>
                </section>
            </v-card>
        </v-layout>
    </v-container>

</template>
<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        methods: {
            ...mapActions(["logout"])
        },
        getters: {
            ...mapGetters(["isLoggedIn"])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
