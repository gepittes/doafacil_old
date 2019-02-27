<template>
    <v-container fluid>
        <v-card color="" >
            <v-toolbar
                dark
                color="primary">
                <v-toolbar-title>Olá!</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-layout justify-space-around>
                    <v-flex xs5>
                        <v-layout column>
                            <v-img
                                :src="require('@/assets/bell_notification.gif')"
                                aspect-ratio="1.5"
                                height="300"
                                contain/>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
        };
    },
};
</script>
