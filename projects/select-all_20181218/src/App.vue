<template>
  <div>
    <p><BaseCheckbox @change="onAllSelect">全选</BaseCheckbox></p>
    <p v-for="(v, i) of d" :key="v">
      <BaseCheckbox @change="(e, checked) => {change(checked, i)}">{{v}}</BaseCheckbox>
    </p>

  </div>
</template>

<script>
import BaseCheckbox from '@/components/forms/BaseCheckbox'
class SelectAll {
  constructor () {
    this.total = 0 // 可选择总数
    this.selectNum = 0 // 当前选择数
  }
  // 重置
  setSelectTotal (total) {
    this.total = total
    this.selectNum = 0
  }
  select (checked) {
    if (checked) {
      this.selectNum++
    } else {
      this.selectNum--
    }
    return this.getStates()
  }
  selectAll (checked) {
    this.selectNum = this.total
    return 1
  }
  // 0 没有选择 1 全选 2 有选择
  getStates () {
    if (this.selectNum === 0) {
      return 0
    }
    if (this.selectNum === this.total) {
      return 1
    }
    return 2
  }
  // // 是否全选
  // isAll () {
  //   return this.selectNum === this.total
  // }
  // // 没有任何选择
  // isNothing () {
  //   return this.selectNum === 0
  // }
}
export default {
  components: {
    BaseCheckbox
  },
  data () {
    return {
      d: [1, 2, 3, 4]
    }
  },
  created () {
    this.selectAll = new SelectAll()
    this.selectAll.setSelectTotal(this.d.length) // 设置可选择总数
  },
  methods: {
    change (checked) {
      this.selectAll.select(checked) // 根据参数决定 select notSelect 加减1
      // if (checked) {
      //   selectAll.delNotSelect() // 减 1
      // }
    },
    onAllSelect (e, checked) {
      this.selectAll.selectAll(checked)
    }
  }
}
</script>
