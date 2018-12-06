<template>
  <div class="img-box"><img class="img" :src="d.image"></div>
</template>

<script>
export default {
  props: {
    d: Object
  }
}
</script>

<style scoped>
  .img-box {
    height: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
