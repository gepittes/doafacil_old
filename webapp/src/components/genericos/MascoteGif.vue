<template>
  <v-img :src="gifMascote" :max-width="width" />
</template>

<script>
export default {
  name: 'MascoteGif',
  props: {
    width: Number,
  },
  data() {
    return {
      gifMascote: require('../../assets/doafacil/gifs/hand-gif.gif'),
    }
  },
}
</script>
