<template>
  <label class="label-text">
    <VLabel><slot/></VLabel>
    <BaseText :type="type" :min="min" :placeholder="placeholder" :value="value" @inputValue="v=>{$emit('inputValue',v)}" @change="$emit('change',$event)"/>
  </label>
</template>

<script>
import VLabel from './VLabel'
import BaseText from './BaseText'
export default {
  props: {
    placeholder: {
      type: String,
      defalut: ''
    },
    type: {
      type: String,
      defalut: 'text'
    },
    min: String,
    value: [String, Number]
  },
  components: {
    VLabel,
    BaseText
  }
}
</script>

<style scoped>
.label-text {
  display: inline-block;
  padding: 4px;
}
.form-control {
  width: 60px;
}
</style>
