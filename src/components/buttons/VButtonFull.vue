
<template>
  <VButton class="b-btn-full" :s="s">
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
.b-btn-full {
  display: block;
  width: 100%;
}
</style>


