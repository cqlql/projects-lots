<template>
  <div class="s">
    <div class="ipt"></div>
    <RegionSelector />
  </div>
</template>

<script>
import RegionSelector from './RegionSelector'
export default {
  components: {
    RegionSelector
  }
}
</script>


<style scoped>
.s {
  color: red;
  font-size: 20px;
}
.ipt {
  height: 38px;
  width: 300px;
  border: 1px solid #ddd;
}
</style>
