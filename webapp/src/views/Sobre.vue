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
                            <MarkdownViewer src="/README.md"></MarkdownViewer>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

import MarkdownViewer from '../modules/_helpers/markdown-viewer/MarkdownViewer.vue';

export default {
  name: 'sobre',
  components: {
    MarkdownViewer
  },
};
</script>
