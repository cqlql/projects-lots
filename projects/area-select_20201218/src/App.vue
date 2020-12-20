<template>
  <div class="s">
    <p>{{ id }}</p>
    <AreaSelect v-model="id" />
  </div>
</template>

<script>
import AreaSelect from './area-select/AreaSelect.vue'

export default {
  components: { AreaSelect },
  data () {
    return {
      id: ''
    }
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
