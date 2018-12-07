<template>
  <label class="lb-cont">
    <p class="lb-text">
      <VLabel>内容：</VLabel>
    </p>
    <BaseTextareaFull :placeholder="placeholder" :value="value" @inputValue="v => $emit('inputValue', v)"></BaseTextareaFull>
  </label>
</template>

<script>
import VLabel from './VLabel'
import BaseTextareaFull from '@/components/forms/BaseTextareaFull'
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
    BaseTextareaFull
  }
}
</script>

<style scoped>
/* .lb-cont {
  font-size: 18px;
  color: #666;
} */
.lb-text {
  padding: 20px 0 16px;
}
</style>
