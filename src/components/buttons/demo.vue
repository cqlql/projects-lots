<template>
  <div class="box">
    <p>
      <VButton>按钮</VButton>
    </p>
    <p><VButton s="white">按钮</VButton></p>
    <p><VButton s="green">按钮</VButton></p>
    <p><VButton s="red">按钮</VButton></p>
    <p><VButton s="gray">按钮</VButton></p>
    <p><VButtonBorder>边框按钮</VButtonBorder></p>
    <p><VButtonFull>等宽按钮</VButtonFull></p>
    <p><VButtonFixedBottom>确定</VButtonFixedBottom></p>
    <p><VButton3>登录</VButton3></p>
  </div>
</template>

<script>
import VButton from './VButton'
import VButtonFull from './VButtonFull'
import VButtonBorder from './VButtonBorder'
import VButton3 from './VButton3'
import VButtonFixedBottom from './VButtonFixedBottom'
export default {
  components: {
    VButton,
    VButtonFull,
    VButtonBorder,
    VButton3,
    VButtonFixedBottom
  }
}
</script>

<style scoped>
.box {
  /* margin: 10px; */
  p {
    padding: 8px;
  }
}
</style>
