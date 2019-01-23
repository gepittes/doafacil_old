<template>
    <v-btn flat>
        <v-badge right color="red">
            <span slot="badge">{{quantidade_notificacoes}}</span>
            <v-icon
                    dark
                    color="white darken-1">
                notifications
            </v-icon>
        </v-badge>
    </v-btn>
</template>

<script>
export default {
  name: 'NotificacaoBadge',
  data() {
    return {
        quantidade_notificacoes: 0,
    };
  },
};
</script>

<style scoped>

</style>
