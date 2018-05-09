<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script>
  import demo from './modules/draw/demo'
  export default {
    components: {
      demo
    }
  }
</script>

<style>
  canvas{
    width: 300px;
    height: 600px;
    background-color: #ddd;
  }
</style>
