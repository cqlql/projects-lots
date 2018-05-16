<template>
  <div class="box">
    <p><VButton>提交</VButton></p>
    <p><VButton3>登录</VButton3></p>
  </div>
</template>

<script>
import VButton from './VButton'
import VButton3 from './VButton3'
export default {
  components: {
    VButton,
    VButton3
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
</style>
