<template>
  <NumKeypad @input="input"></NumKeypad>
</template>

<script>
  import NumKeypad from './NumKeypad'
  export default {
    components: {
      NumKeypad
    },
    methods: {
      input (v) {
        console.log(v)
      }
    }
  }
</script>

<style scoped>

</style>
