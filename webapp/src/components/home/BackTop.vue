<template>
    <v-fab-transition>
        <v-btn
            v-scroll="onScroll"
            v-show="fab"
            fab
            dark
            fixed
            bottom
            right
            max-width="40"
            max-height="40"
            color="primary"
            @click="toTop"
            style="z-index: 10"
        >
            <i class="fas fa-home fa-lg"></i>
        </v-btn>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "BackTop",
        data() {
            return {
                fab: false
            }
        },
        methods: {
            onScroll(e) {
                if (typeof window === 'undefined') return
                const top = window.pageYOffset || e.target.scrollTop || 0
                this.fab = top > 20
            },
            toTop() {
                this.$vuetify.goTo(0)
            }
        },
    }
</script>