<template>
    <v-container fluid>
        <v-card color="">
            <v-toolbar
                dark
                color="primary">
                <v-toolbar-title>Sobre!</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout
                    align-center
                    justify-center
                    column
                    fill-height>
                    <MarkdownViewer src="/README.md"/>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

import MarkdownViewer from '../_helpers/markdown-viewer/MarkdownViewer.vue';

export default {
    name: 'Sobre',
    components: {
        MarkdownViewer,
    },
};
</script>
