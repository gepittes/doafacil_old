<template>
    <v-container fluid>
        <v-card color="" >
            <v-toolbar dark color="primary">
                <v-toolbar-title>Olá!</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout justify-space-around>
                    <v-flex xs5>
                        <v-layout column>
                            <v-img :src="require('@/assets/bell_notification.gif')" aspect-ratio="1.5" height="300"
                                   contain></v-img>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

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
