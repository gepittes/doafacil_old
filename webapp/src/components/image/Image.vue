<template>
  <div class="linha">
    <div class="coluna">
      <div class="imagem">
        <img :src="image" :style="styled" />
      </div>
      <div class="alterar">
        <span>Alterar</span>
        <input type="file" v-on:change="onFileChange($event)" />
      </div>
      <div class="salvar">
        <button @click="upload()">Salvar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "imagem",
  props: ["imgWidth", "imgHeight"],
  data() {
    return {
      image: `https://via.placeholder.com/${this.imgWidth}x${this.imgHeight}`
    };
  },
  computed: {
    styled() {
      return {
        height: `${this.imgHeight}px`,
        width: `${this.imgWidth}px`,
        backgroundImage: `url(${this.image})`
      };
    }
  },
  methods: {
    ...mapActions({
      uploadImage: "image/uploadImage"
    }),
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    upload() {
      const data = { image: this.image };
      this.uploadImage(data);
    }
  }
};
</script>
<style scoped>
.linha {
  margin: 10px;
  padding: 5px;
  box-shadow: 2px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.coluna {
  display: flex;
  flex-direction: column;
}
.alterar {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: right;
  margin-top: 10px;
  right: 10px;
  margin-right: 10px;
}
.imagem {
  display: flex;
  flex-direction: column;
}
.alterar {
  border-radius: 8px;
  font: normal 14px Myriad Pro, Verdana, Geneva, sans-serif;
  color: #ebebeb;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 30px;
}
.alterar input[type="file"] {
  -webkit-appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.alterar span {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-weight: bold;
}
.alterar:hover {
  background: rgb(4, 62, 185);
}
.salvar {
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: right;
  margin-top: 50px;
  margin-right: 10px;
  right: 10px;
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font: normal 14px Myriad Pro, Verdana, Geneva, sans-serif;
  color: #ebebeb;
  background: rgba(0, 0, 0, 0.6);
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  font-weight: bold;
}
img {
  position: relative;
}
</style>
