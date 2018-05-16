<template>
  <div class="user-name-input">
    <BaseText class="uname" placeholder="请输入登录账号" />
    <IconUser class="icon-user" />
  </div>
</template>

<script>
import BaseText from './BaseTextCircular'
import IconUser from '@/components/ico/User'
export default {
  components: {
    BaseText,
    IconUser
  }
}
</script>

<style scoped>
.user-name-input {
  position: relative;
}
.uname {
  padding-left: 58px;
}

.icon-user {
  position: absolute;
  left: 21px;
  top: 7px;
  width: 28px;
  height: 30px;
  color: #b7b6b6;
  transition: color 0.15s ease-in-out 0s;
}
.uname:focus + .icon-user {
  color: #0ace82;
}
</style>
