<template>
  <div>
    <div v-if="titles" class="s-tit">
      <div v-for="(tit, i) in titles" :key="i" class="s-t">{{ tit }}</div>
    </div>
    <div class="s-err-msg">{{ msgErrorTxt }}</div>
    <div class="s-main">
      <ListBase
        v-for="(list,i) of lists"
        :id="i"
        ref="vListBase"
        :key="i"
        :list="list"
        :index="selectedIndexs[i]"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import ListBase from './ListBase.vue'
export default {
  components: {
    ListBase
  },
  data () {
    return {
      titles: [],
      lists: [],
      selectedIndexs: [],
      msgErrorTxt: ''
    }
  },
  methods: {
    change (index, id) {
      let { selectedIndexs } = this
      this.$set(selectedIndexs, id, index)
      this.onChange(index, id, selectedIndexs)
    },
    confirm () {
      if (this.msgErrorTxt) return // 错误情况跳出
      return this.onConfirm(this) !== false
      // if (this.onConfirm(this) === false)
    },
    getSelectedIndexs () {
      // this.$refs.vListBase.forEach(vList => {
      //   console.log(vList.index)
      // })
      let { $set } = this
      let selectedIndexs = this.selectedIndexs
      this.lists.forEach((d, i) => {
        $set(selectedIndexs, i, selectedIndexs[i] || 0)
      })
      return selectedIndexs
    },
    getSelectedValues () {
      let { selectedIndexs } = this
      let selectedValues = []
      this.lists.forEach((list, i) => {
        selectedValues.push(list[selectedIndexs[i] || 0])
      })
      return selectedValues
    },
    getIndexsByValues (lists, selectedValues) {
      let selectedIndexs = []
      selectedValues.forEach((v, id) => {
        let list = lists[id]
        if (list.some(({ value }, i) => {
          // clog(value, v) // 测试
          if (value === v) {
            selectedIndexs.push(i)
            return true
          }
        }) === false) {
          selectedIndexs.push(0)
        }
      })
      return selectedIndexs
    },
    getIndexsByValuesObj (lists, selectedValuesObj) {
      let selectedIndexs = []
      selectedValuesObj.forEach((d, id) => {
        let list = lists[id]
        if (list.some(({ value }, i) => {
          // clog(value, v) // 测试
          if (value === d.value) {
            selectedIndexs.push(i)
            return true
          }
        }) === false) {
          selectedIndexs.push(0)
        }
      })
      return selectedIndexs
    },
    setList (index, list) {
      this.$set(this.lists, index, list)
    },
    msgError (msgTxt) {
      this.msgErrorTxt = msgTxt
    },
    // selectedValues 传 undefined、null 将不会进行查找处理
    // 优先处理 selectedValuesObj
    setOptions (options) {
      if (!options) return
      let { titles, lists, selectedIndexs, selectedValues, selectedValuesObj, onConfirm, onChange = () => { } } = options
      if (titles) this.titles = titles
      if (lists) this.lists = lists
      if (selectedIndexs) {
        this.selectedIndexs = selectedIndexs
      } else if (selectedValuesObj) {
        this.selectedIndexs = this.getIndexsByValuesObj(lists, selectedValuesObj)
      } else if (selectedValues) {
        this.selectedIndexs = this.getIndexsByValues(lists, selectedValues)
      }
      if (onConfirm) this.onConfirm = onConfirm
      this.onChange = onChange
    }
  }
}
</script>

<style scoped>
.s-tit {
    display: flex;
    text-align: center;
    .s-t {
      flex: 1;
      font-size: 14px;
      line-height: 28px;
      height: 28px;
    }
  }

  .s-err-msg {
    /* padding-top: 2PX; */
    color: red;
    text-align: center;
    line-height: 1.4;
  }

  .s-main {
    display: flex;
    height: 200px;
  }
</style>
