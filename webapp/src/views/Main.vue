<template>
  <div class="row">
    <imagem :imgWidth="800" :imgHeight="300" />
  </div>
</template>
<script>
import imagem from "../modules/image/Image";

export default {
  components: { imagem }
};
</script>
<style scoped></style>
