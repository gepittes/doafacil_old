<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" :height="imgHeight" :src="imagPath">
      <v-card-title mt-0>
        <v-row class="file">
          <v-btn small color="primary"><v-icon>fa fa-camera</v-icon></v-btn>
          <input type="file" v-on:change="onFileChange($event)" />
        </v-row>
        <v-row class="save" v-if="isFile">
          <v-btn small color="success" @click="upload()"
            ><v-icon>fa fa-save</v-icon></v-btn
          >
        </v-row>
      </v-card-title>
    </v-img>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'imagem',
  props: {
    imgWidth: {
      type: String,
    },
    imgHeight: {
      type: String,
    },
    objectId: {
      type: Number,
    },
    objectName: {
      type: String,
    },
    modelImage: {
      type: String,
    },
    newImage: {
      type: String,
    },
  },

  data() {
    return {
      image: `https://via.placeholder.com/${this.imgWidth}x${this.imgHeight}`,
      isFile: false,
    }
  },
  computed: {
    ...mapGetters({
      object: 'image/object',
    }),
    styled() {
      return {
        height: `${this.imgHeight}px`,
        width: `${this.imgWidth}px`,
        backgroundImage: `url(${this.image})`,
      }
    },
    imagPath() {
      if (this.newImage && !this.isFile) {
        return (this.image = `http://localhost/img/${this.newImage}`)
      }
      return this.image
    },
  },
  watch: {
    object(value) {
      this.$emit('setObject', value)
    },
  },
  methods: {
    ...mapActions({
      uploadImage: 'image/uploadImage',
    }),
    onFileChange(e) {
      this.isFile = true
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage(file) {
      let reader = new FileReader()
      let vm = this
      reader.onload = e => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },

    upload() {
      const data = {
        image: this.image,
        objectId: this.objectId,
        objectName: this.objectName,
        modelImage: this.modelImage,
      }

      this.uploadImage(data)
      this.isFile = false
    },
  },
}
</script>
<style scoped>
.file {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: right;
  right: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.file input[type='file'] {
  -webkit-appearance: none;
  position: absolute;
  opacity: 0;
}
.btn {
  padding: 0;
}

.save {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: right;
  right: 65px;
  margin-right: 10px;
}
</style>
