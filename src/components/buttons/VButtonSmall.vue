
<template>
  <VButton :s="s" @click="$emit('click')">
    <slot/>
  </VButton>
</template>
<script>
import VButton from './VButton'
export default {
  props: {
    s: String
  },
  components: {
    VButton
  }
}
</script>

<style scoped>
.b-btn {
  width: auto;
  height: 30px;
  padding: 0px 16px;
  font-size: 14px;
  box-shadow: none;
}
</style>
