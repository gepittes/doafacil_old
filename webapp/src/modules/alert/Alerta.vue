<template>
    <div>
        <v-snackbar :value="true"
                    :top="false"
                    transition="scale-transition"
                    :timeout="timeout"
                    :color="color"
                    :vertical="false"
                    dismissible>
            <slot></slot>
            <v-btn dark
                    flat
                    @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
export default {
  name: 'Alerta',
  data: () => ({
    timeout: 6000,
    snackbar: false,
    top: true,
  }),
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  watch: {
    color(value) {
      console.log(value);
      this.snackbar = true;
    },
  },
};
</script>
