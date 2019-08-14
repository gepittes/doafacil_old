<template>
    <section>
        <v-parallax :src="image" height="380">
            <v-layout align-center justify-space-around row fill-height>
                <a :href="links.face" target="_blank">
                    <v-icon x-large dark>fab fa-facebook-f</v-icon>
                </a>
                <a :href="links.twitter" target="_blank">
                    <v-icon x-large dark>fab fa-twitter</v-icon>
                </a>
                <a :href="links.insta" target="_blank">
                    <v-icon x-large dark>fab fa-instagram</v-icon>
                </a>
            </v-layout>
        </v-parallax>
    </section>
</template>

<script>
    export default {
        name: "RedesSociais",
        props: {
            image: String
        },
        data() {
            return {
                links: {
                    face: 'https://www.facebook.com/unidesc/',
                    twitter: '#',
                    insta: 'https://www.instagram.com/gepitees_unidesc'
                }
            }
        }
    }
</script>

