<template>
  <div>
    <label>
      <!-- <span class="name"></span> -->
      <VLabel><slot/></VLabel>
      <BaseText :placeholder="placeholder" :value="value" @inputValue="v=>{$emit('inputValue',v)}"/>
    </label>
  </div>
</template>

<script>
import VLabel from './VLabel'
import BaseText from '@/components/forms/BaseText'
export default {
  props: {
    placeholder: {
      type: String,
      defalut: ''
    },
    value: String
  },
  components: {
    VLabel,
    BaseText
  }
}
</script>

<style scoped>
/* .name {
  font-size: 18px;
  color: #666;
} */
.form-control {
  width: 300px;
}
</style>
