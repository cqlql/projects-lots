<template>
  <div>
    <p @click="show=1">显示蒙层</p>
    <VMask v-if="show" @click="show=0"></VMask>
  </div>
</template>

<script>
  import VMask from './VMask'
  export default {
    data () {
      return {
        show: 1
      }
    },
    components: {
      VMask
    }
  }
</script>

<style scoped>
  p{
    text-align: center;
  }
</style>
