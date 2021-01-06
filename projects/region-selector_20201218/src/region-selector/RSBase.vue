<template>
  <div class="region-selector" :style="{left:left+'px',top:top+'px'}">
    <RSHeader
      :index="currIndex"
      :selected-items="selectedItems"
      :types="types"
      @select="onSelectIndex"
    />
    <div class="cont">
      <!-- eslint-disable vue/require-v-for-key -->
      <ul
        v-for="(list,i) of all"
        v-show="currIndex===i"
        class="a-list"
      >
        <li
          v-for="(item) in list"
          :key="item.id"
          :class="['a-item', (selectedItems[i]||{}).id===item.id ? 'active':'']"
          @click="onSelectItem(item)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import OutsideClose from '@/utils/corejs/dom/outside-close.js'
import RSHeader from './RSHeader'
export default {
  components: { RSHeader },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    get: {
      type: Function,
      default: () => new Promise((resolve, reject) => resolve())
    },
    types: {
      default: () => [],
      type: Array
    },
    top: {
      default: 0,
      type: Number
    },
    left: {
      default: 0,
      type: Number
    }
    // // 当前选中的id
    // value: {
    //   default: '',
    //   type: String
    // }
  },
  data () {
    return {
      // types: ['省', '市', '区'],
      currIndex: 0, // 当前展示的列表
      all: [],
      selectedItems: [] // 当前选中的项
      // 当前选中id
      // id: ''
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
    isNoEnd () {
      return this.selectedItems.length < this.maxLevel
    }
  },
  watch: {
    selectedItems (items) {
      let id = ''
      let names = ''
      let name = '' // 当前选中的最后一级name
      if (items.length) {
        const lastItem = items[items.length - 1]
        id = lastItem.id
        name = lastItem.name
        this.selectedItems.forEach(({ name }) => {
          names += '/' + name
        })
        names = names.substr(1)
      }
      this.$emit('change', { id, name, names, end: !this.isNoEnd })
    }
  },

  async created () {
    const list = await this.get()
    this.all.push(list)
  },
  mounted () {
    const $el = this.$el
    document.body.appendChild($el)
    // 点外面关闭
    // 用最外层可能会有一块空白区域，所以用了独立的子元素区别里外
    // 但由于 RSBase 用了 v-if，所以无法初始绑定，才增加了 rs-select
    this.outsideClose = new OutsideClose($el, () => {
      this.$emit('close')
    })
  },
  methods: {
    async onSelectItem (item) {
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
      if (list.length === 1) {
        this.onSelectItem(list[0])
      }
    },
    onSelectIndex (i) {
      this.currIndex = i
      this.selectedItems.splice(i + 1)
    },
    clear () {
      this.currIndex = 0
      this.selectedItems = []
    }
  }
}
</script>

<style scoped>
.region-selector {
  color: #606266;
  border: 1px solid #ddd;
  font-size: 14px;
  line-height: 34px;
  border-radius: 4px;

  .a-list {
    list-style-type:none;padding:0;margin:0;
    height: 300px;
    overflow: auto;
  }
  .a-item {
    padding: 0 20px;
  }
  .a-item:hover {
    background: #F5F7FA;
  }
  .a-item.active {
    color: #409eff;
    font-weight: 700;
  }
}
</style>
