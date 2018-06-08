<template>
  <div class="box">
    <VBtn @click="add">增加选项</VBtn>
    <div class="tab-box">
    <VTab :names="names" @change="onChange">
      <div class="cont-item" v-for="(item, i) in list" :key="i" v-show="selectedIndex===i">
        {{item}}
      </div>
    </VTab>
    </div>
  </div>
</template>

<script>
import VBtn from '../buttons/VButtonSmall'
import VTab from './index'
export default {
  data () {
    return {
      names: ['1', '2', '3'],
      list: ['内容1', '内容2', '内容3'],
      selectedIndex: 0
    }
  },
  methods: {
    add () {
      this.names.push(`第${this.names.length + 1}项`)
    },
    onChange (i, stop) {
      if (i === 2) {
        // 制止第三项触发
        stop()
      } else {
        this.selectedIndex = i
      }
    }
  },
  components: {
    VTab,
    VBtn
  }
}
</script>

<style scoped>
.box {
  padding:10px 100px 0;
}
.tab-box {
  padding: 10px;
}
.cont-item {
  min-height: 300px;
  padding: 10px;
}

</style>
