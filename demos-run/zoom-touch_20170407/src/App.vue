<template>
  <div class="main">
    <deom1></deom1>
    <deom2></deom2>
  </div>
</template>

<script>
  import deom1 from './demos/demo1.vue'
  import deom2 from './demos/demo2.vue'
  export default {
    components: {
      deom1,
      deom2
    }
  }
</script>

<style scoped>
.main {
  padding-bottom: 100px;
}
</style>
