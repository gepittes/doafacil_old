<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
const defaultLayout = 'default'
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}-layout`
    },
  },
}
</script>
