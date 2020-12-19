<template>
  <div class="region-selector">
    <div class="r-header">
      <div
        v-for="(tit,i) in tits"
        :class="['h-item', currIndex===i ? 'active':'']"
        @click="onHeaderSelect(i)"
      >{{ tit }}</div>
    </div>
    <div class="cont">
      <ul
        v-for="(list,i) of all"
        v-show="currIndex===i"
        class="r-list"
      >
        <li
          v-for="(item) in list" :key="item.id"
          :class="['r-item', (selectedItems[i]||{}).id===item.id ? 'active':'']"
          @click="onSelect(item)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    get: {
      type: Function,
      default: () => new Promise((resolve, reject) => resolve())
    }
  },
  data () {
    return {
      // initName: '省',
      types: ['省', '市', '区'],
      // tits: [],
      currIndex: 0,
      // maxLevel: 3,
      all: [],
      selectedItems: [],
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
    tits () {
      const tits = []
      let noOne = true
      this.selectedItems.forEach(({ name }) => {
        tits.push(name)
        noOne = false
      })
      if (noOne) {
        tits.push(this.types[this.currIndex])
      } else {
        tits.push(this.types[this.currIndex])
      }
      // if (this.isNoMax) tits.push(this.types[this.currIndex])
      return tits
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
      if (index >= maxLevel) {
        if (this.isNoMax) {
          selectedItems.push(item)
        } else {
          this.$set(selectedItems, selectedItems.length - 1, item)
        }
        return
      }
      const { id } = item
      this.selectedItems.push(item)
      const list = await this.get(id)
      this.$set(this.all, index, list)
      this.currIndex = index
      console.log(this.all)
    },
    onHeaderSelect (i) {
      this.currIndex = i
      this.selectedItems.splice(i + 1)
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
  .r-list {
    list-style-type:none;padding:0;margin:0
  }
  .r-item {
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
