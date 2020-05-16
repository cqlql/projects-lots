<template>
  <div class="main">
    <Demo />
    <DemoAcross />
  </div>
</template>
<script>
import Demo from './Demo'
import DemoAcross from './DemoAcross'
export default {
  components: {
    Demo,
    DemoAcross
  }
}
</script>

<style scoped>
.main {
  padding: 10px;
}
</style>
