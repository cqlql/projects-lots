<template>
    <div class="password-input">
    <BaseText class="pword" type="password" placeholder="请输入密码" />
    <Password class="ico" />
  </div>
</template>

<script>
import BaseText from './BaseTextCircular'
import Password from '@/components/ico/Password'
export default {
  components: {
    BaseText,
    Password
  }
}
</script>

<style scoped>
.password-input {
  position: relative;
}
.pword {
  padding-left: 58px;
}

.ico {
  position: absolute;
  left: 21px;
  top: 9px;
  width: 28px;
  height: 30px;
  color: #b7b6b6;
   transition: color 0.15s ease-in-out 0s;
}
.pword:focus + .ico {
  color: #0ace82;
}
</style>
