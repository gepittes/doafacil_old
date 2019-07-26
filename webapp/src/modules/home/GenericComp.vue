<template>
    <v-parallax :src="imgParalax" height="380">
        <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Generic Componenct
            </div>
            <em>text</em>
            <v-btn class="blue lighten-2 mt-5" dark large href="#">
                here!
            </v-btn>
        </v-layout>
    </v-parallax>
</template>

<script>
    export default {
        name: "GenericComp",
        props: {
            imgParalax: String
        }
    }
</script>

<style scoped>

</style>