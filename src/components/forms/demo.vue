<template>
  <div class="box">
    <p><BaseText/></p>
    <p><BaseTextCircular/></p>
    <p><UserNameInput/></p>
    <p><PasswordInput/></p>
  </div>
</template>

<script>
import BaseText from './BaseText'
import BaseTextCircular from './BaseTextCircular'
import UserNameInput from './UserNameInput'
import PasswordInput from './PasswordInput'
export default {
  components: {
    BaseText,
    BaseTextCircular,
    UserNameInput,
    PasswordInput
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
</style>
