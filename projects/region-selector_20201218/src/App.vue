<template>
  <div class="s">
    <p>{{ JSON.stringify(values) }}</p>
    <RegionSelector @change="change" />
  </div>
</template>

<script>
import RegionSelector from './region-selector/RegionSelector'

export default {
  components: { RegionSelector },
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
