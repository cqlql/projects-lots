<template>
  <div class="r-header">
    <div
      v-for="(tit,i) in tits"
      :class="['h-item', index===i ? 'active':'']"
      @click="$emit('select', i)"
    >{{ tit }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    }
  },
  // data () {
  //   return {
  //   }
  // },
  computed: {
    tits () {
      const { index, selectedItems } = this
      const tits = []
      // this.selectedItems.forEach(({ name }) => {
      //   tits.push(name)
      // })
      for (let i = 0, len = index + 1; i < len; i++) {
        const item = selectedItems[i]
        if (item) {
          tits.push(item.name)
        } else {
          tits.push(this.types[i])
        }
      }
      console.log(this.index)
      // if (this.index < maxLevel && isNoMax) {
      //   tits.push(this.types[this.index])
      // }
      return tits
    }
  }
  // methods: {
  //   onClick (i) {
  //     this.$emit('select', i)
  //   }
  // }
}
</script>

<style scoped>
  .r-header {
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    /* text-align: center; */
    display: flex;
    justify-content: space-around;
    align-items: stretch;
  }
  .h-item {
    /* flex: 1; */
    display: inline-block;
    text-align: center;
  }
  .h-item.active {
    border-bottom: 3px solid #409eff;
  }
</style>
