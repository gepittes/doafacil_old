<template>
    <v-snackbar :value="snackbar"
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
</template>
<script>
export default {
  name: 'Alerta',
  data: () => ({
    timeout: 6000,
    color: 'success',
    snackbar: false,
    top: true,
  }),
  props: {
    colorProp: {
      type: String,
      required: true,
    },
  },
  watch: {
    colorProp(value) {
      console.log(value);
      this.color = value;
      this.snackbar = true;
    },
  },
};
</script>
