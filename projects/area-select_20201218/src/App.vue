<template>
  <div class="s">
    <p>{{ JSON.stringify(values) }}</p>
    <AreaSelect @change="change" />
  </div>
</template>

<script>
import AreaSelect from './area-select/AreaSelect.vue'

export default {
  components: { AreaSelect },
  data () {
    return {
      values: ''
    }
  },
  methods: {
    change (values) {
      this.values = values
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
