<template>
  <NumSwitch1 :equation="equation"></NumSwitch1>
</template>

<script>
  import NumSwitch1 from './NumSwitch1'

  export default {
    data () {
      return {
        equation: '2+8,3+7,4+6,7+5,9+7,9+8,14-2,18-6,16-5,8-4-2,8-5-2,2+2+5,2+3+4,3+5-4,4-1+5'
      }
    },
    components: {
      NumSwitch1
    }
  }
</script>
