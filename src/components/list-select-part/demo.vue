<template>
  <div class="box">
    <ListSelect ref="vListSelect" />
    <div>
      <button @click="highlightPrev">高亮上一个</button>
      <button @click="highlightNext">高亮下一个</button>
      <button @click="highlight2">高亮第二个</button>
      <button @click="highlightLast2">高亮倒数第二个</button>
    </div>
    <!-- <input type="text" @keyup="keyup"> -->
  </div>
</template>

<script>
import ListSelect from './index.vue'
export default {
  components: {
    ListSelect
  },
  methods: {
    // keyup (e) {
    //   console.log(e)
    // },
    highlightPrev () {
      this.$refs.vListSelect.highlightPrev()
    },
    highlightNext () {
      this.$refs.vListSelect.highlightNext()
    },
    highlight2 () {
      this.$refs.vListSelect.highlight(
        1
      )
    },
    highlightLast2 () {
      this.$refs.vListSelect.highlight(
        this.$refs.vListSelect.eItems.length - 2
      )
    }
  }
}
</script>

<style>
.box {
  width: 300px;
}
</style>
