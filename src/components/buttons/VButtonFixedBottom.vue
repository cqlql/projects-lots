
<template>
  <VButton :class="$style.full" :s="s" @click="$emit('click')"><slot /></VButton>
</template>
<script>
import VButton from './VButton'
export default {
  components: {
    VButton
  },
  props: {
    s: {
      type: String,
      default: ''
    }
  }
}
</script>

<style module>
.full {
  border-radius: 0;

  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 54px;

  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>
