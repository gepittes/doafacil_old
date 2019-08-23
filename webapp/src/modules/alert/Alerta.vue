<template>
    <div>
        <v-snackbar
            :value="snackbar"
            :top="false"
            :timeout="timeout"
            :color="color"
            :vertical="false"
            transition="scale-transition"
            dismissible
        >
            <slot/>
            <v-btn
                dark
                text
                @click="changeStatus">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
export default {
    name: 'Alerta',
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        timeout: 6000,
        snackbar: true,
        top: true,
    }),
    methods: {
        changeStatus() {
            this.snackbar = false
        }
    },
    watch: {
        color() {
            this.snackbar = true;
        },
    },
};
</script>
