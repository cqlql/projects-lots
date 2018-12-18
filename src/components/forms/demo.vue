<template>
  <div class="box">
    <p>
      <BaseText/>
    </p>
    <p>
      <BaseTextCircular/>
    </p>
    <p>
      <BaseTextareaFull/>
    </p>
    <p>
      <UserNameInput/>
    </p>
    <p>
      <PasswordInput/>
    </p>
    <p>
      <LabelText>密码</LabelText>
    </p>
    <p>
      <BaseCheckbox>选项1</BaseCheckbox>
      <BaseCheckbox>选项2</BaseCheckbox>
    </p>
    <p>
      <BaseSelect>
        <option v-for="v of 3" :value="v" :key="v">{{v}}</option>
      </BaseSelect>
    </p>
  </div>
</template>
<script>
import BaseText from './BaseText'
import BaseTextareaFull from './BaseTextareaFull'
import BaseTextCircular from './BaseTextCircular'
import UserNameInput from './UserNameInput'
import PasswordInput from './PasswordInput'
import LabelText from './LabelText'
import BaseCheckbox from './BaseCheckbox'
import BaseSelect from './BaseSelect'
export default {
  components: {
    BaseText, BaseTextareaFull, BaseTextCircular, UserNameInput, PasswordInput, LabelText, BaseCheckbox, BaseSelect
  }
}
</script>

<style scoped>
.box {
  margin: 10px;
}
</style>
