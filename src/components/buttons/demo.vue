<template>
  <div class="box">
    <p><VButton>提交</VButton></p>
    <p><VButtonBorder>边框按钮</VButtonBorder></p>
    <p><VButtonFull>等宽按钮</VButtonFull></p>
    <p><VButton3>登录</VButton3></p>
  </div>
</template>

<script>
import VButton from './VButton'
import VButtonFull from './VButtonFull'
import VButtonBorder from './VButtonBorder'
import VButton3 from './VButton3'
export default {
  components: {
    VButton,
    VButtonFull,
    VButtonBorder,
    VButton3
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
</style>
