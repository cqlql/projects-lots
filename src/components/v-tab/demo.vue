<template>
  <div class="box">
    <VTab :names="names" @change="onChange">
      <div class="cont-item" v-for="(item, i) in list" :key="i" v-show="selectedIndex===i">
        {{item}}
      </div>
    </VTab>
  </div>
</template>

<script>
import VTab from './VTab'
export default {
  data () {
    return {
      names: ['1', '2', '3'],
      list: ['内容1', '内容2', '内容3'],
      selectedIndex: 0
    }
  },
  methods: {
    onChange (i) {
      this.selectedIndex = i
    }
  },
  components: {
    VTab
  }
}
</script>

<style scoped>
.box {
  padding:10px 100px 0;
}
.cont-item {
  min-height: 300px;
  padding: 10px;
}

</style>
