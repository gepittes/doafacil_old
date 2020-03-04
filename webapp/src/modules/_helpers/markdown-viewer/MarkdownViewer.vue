<template>
  <div class="well well-sm pre-scrollable" v-html="previewText" />
</template>

<script>
import axios from 'axios'

const marked = require('marked')

export default {
  name: 'App',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      md_text: '# Example Title Here!',
    }
  },
  computed: {
    previewText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: true,
        sanitize: true,
        tables: true,
        breaks: true,
        smartypants: true,
        smartLists: true,
      })
      return marked(this.md_text)
    },
  },
  mounted() {
    axios.get(this.src).then(response => {
      this.md_text = response.data
    })
  },
}
</script>
