<template>
  <div class="s">
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <button @click="destroy">销毁</button>
    <p>{{ JSON.stringify(values) }}</p>
    <div v-if="show">
      <RegionSelector @change="change" />
    </div>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
  </div>
</template>

<script>
import RegionSelector from './region-selector/RegionSelector'

export default {
  components: { RegionSelector },
  data () {
    return {
      show: true,
      values: ''
    }
  },
  methods: {
    change (values) {
      this.values = values
    },
    destroy () {
      this.show = false
    }
  }
}
</script>

<style scoped>
.s {
  color: red;
  font-size: 20px;
  width: 300px;
  border: 1px solid #ddd;
  overflow: auto;
  height: 300px;
  position: absolute;
  right: 100px;
}
.ipt {
  height: 38px;
  width: 300px;
  border: 1px solid #ddd;
}
</style>
