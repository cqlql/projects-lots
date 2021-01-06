<template>
  <div class="a-header">
    <!-- eslint-disable-next-line vue/require-v-for-key -->
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
    // eslint-disable-next-line vue/require-default-prop
    types: {
      // default: () => []
      type: Array
    }
  },
  computed: {
    tits () {
      const { index, selectedItems } = this
      const tits = []
      for (let i = 0, len = index + 1; i < len; i++) {
        const item = selectedItems[i]
        if (item) {
          tits.push(item.name)
        } else {
          tits.push(this.types[i])
        }
      }
      return tits
    }
  }
}
</script>

<style scoped>
  .a-header {
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
