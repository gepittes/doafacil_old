<template>
    <v-btn flat>
        <v-badge right color="red">
            <span slot="badge">{{this.notificacoes.length}}</span>
            <v-icon
                    dark
                    color="white darken-1">
                notifications
            </v-icon>
        </v-badge>
    </v-btn>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NotificacaoBadge',
  data() {
    return {
        quantidade_notificacoes: [],
    };
  },
  computed: {
    ...mapGetters({
      notificacoes: 'notificacao/notificacoes',
    }),
  },
  methods: {
    ...mapActions({
      obterNotificacaos: 'notificacao/obterNotificacaos',
    }),
  },
  mounted() {
    if (this.notificacoes.length == null || this.notificacoes.length === 0) {
      this.obterNotificacaos();
    }
  },
};
</script>

<style scoped>

</style>
