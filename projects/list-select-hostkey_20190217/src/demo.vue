<template>
  <div class="box">
    <ListSelect />
  </div>
</template>

<script>
import ListSelect from './ListSelect.vue'
export default {
  components: {
    ListSelect
  }
}
</script>

<style>
.box {
  width: 300px;
}
</style>
