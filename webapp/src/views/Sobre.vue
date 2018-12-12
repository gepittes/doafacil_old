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
                            <div class="well well-sm pre-scrollable" v-html='previewText'></div>
                            <!-- -->

                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

import axios from 'axios';

const marked = require('marked');

export default {
  name: 'app',
  // props: ['src'],
  data() {
    return {
      md_text: '# Title 2',
      src: '/README.md',
    };
  },
  mounted() {
    axios.get(this.src).then((response) => {
      this.md_text = response.data;
    });
  },
  computed: {
    previewText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: true,
        sanitize: true,
        tables: true,
        breaks: true,
        smartypants: true,
        smartLists: true,
      });
      return marked(this.md_text);
    },
  },
};
</script>
