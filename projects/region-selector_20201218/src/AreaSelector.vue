<template>
  <div class="area-selector">
    <AHeader
      :index="currIndex"
      :selected-items="selectedItems"
      :types="types"
      @select="onHeaderSelect"
    />
    <div class="cont">
      <ul
        v-for="(list,i) of all"
        v-show="currIndex===i"
        class="a-list"
      >
        <li
          v-for="(item) in list" :key="item.id"
          :class="['a-item', (selectedItems[i]||{}).id===item.id ? 'active':'']"
          @click="onSelect(item)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import AHeader from './AHeader'
export default {
  components: {
    AHeader
  },
  props: {
    get: {
      type: Function,
      default: () => new Promise((resolve, reject) => resolve())
    }
  },
  data () {
    return {
      types: ['省', '市', '区'],
      currIndex: 0, // 当前展示的列表
      all: [],
      selectedItems: [], // 当前选中的项
      // 当前选中id
      value: ''
    }
  },
  computed: {
    // names () {
    //   let names = ''
    //   this.selectedItems.forEach(({ name }) => {
    //     names += '/' + name
    //   })
    //   names = names.substr(1)
    //   return names
    // },
    maxLevel () {
      return this.types.length
    },
    isNoMax () {
      return this.selectedItems.length < this.maxLevel
    }
  },
  async created () {
    const list = await this.get()
    this.all.push(list)
  },
  methods: {
    async onSelect (item) {
      const { maxLevel, selectedItems } = this
      const index = this.currIndex + 1
      this.$set(selectedItems, index - 1, item)
      if (index >= maxLevel) { // 最后一级不再新增列表
        return
      }
      const { id } = item
      const list = await this.get(id)
      this.$set(this.all, index, list) // 显示列表
      this.currIndex = index
    },
    onHeaderSelect (i) {
      this.currIndex = i
      this.selectedItems.splice(i + 1)
    }
  }
}
</script>

<style scoped>
.area-selector {
  color: #606266;
  border: 1px solid #ddd;
  font-size: 14px;
  line-height: 34px;

  .a-list {
    list-style-type:none;padding:0;margin:0;
    height: 300px;
    overflow: auto;
  }
  .a-item {
    padding: 0 20px;
    &:hover {
      background: #F5F7FA;
    }
    &.active {
      color: #409eff;
      font-weight: 700;
    }
  }
}
</style>
