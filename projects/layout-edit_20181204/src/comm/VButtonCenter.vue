<template>
  <div class="btn-center">
    <VButton @click="$emit('click')"><slot/></VButton>
  </div>

</template>

<script>
import VButton from '@/components/buttons/VButton'
export default {
  components: {
    VButton
  }
}
</script>

<style scoped>
.btn-center {
  text-align: center;
  padding: 12px 25px;
}
</style>
