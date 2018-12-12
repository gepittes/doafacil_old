<template>
    <v-container fluid>
        <v-card color="">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Sobre!</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout justify-space-around>
                    <v-flex xs5>
                        <v-layout column>

<!-- -->
                            <div id="preview">
                                <h2 class="text-success text-center">Preview</h2>
                                <div class="well well-sm pre-scrollable" v-html='previewText'></div>
                            </div>
<!-- -->

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

    let marked = require('marked');

    import axios from 'axios';

    export default {
        name: 'app',
        props: ['src'],
        data() {
            return {
                md_text: '# Title 2',
            }
        },
        mounted() {
            console.log(axios.get(this.src).then(response => {this.md_text = response.data}))
        },
        computed: {
            previewText() {
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: true,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: false
                });
                return marked(this.md_text)
            }
        },
    }


</script>
