
<template>
  <div class="v-bg" :style="{'background-color':bgc}"></div>
</template>

<script>
  export default {
    props: {
      bgc: String
    }
  }
</script>

<style scoped>
.v-bg{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>

