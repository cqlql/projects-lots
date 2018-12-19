<template>
  <div>
    <p><BaseCheckbox @change="onAllSelect" :checked="allChecked">全选</BaseCheckbox></p>
    <p v-for="(v, i) of d" :key="i">
      <BaseCheckbox @change="(e, checked) => {change(checked)}">{{v}}</BaseCheckbox>
    </p>

  </div>
</template>

<script>
import BaseCheckbox from '@/components/forms/BaseCheckbox'
import SelectAll from './select-all-base.js'
export default {
  components: {
    BaseCheckbox
  },
  data () {
    return {
      allChecked: false,
      d: [1, 2, 3, 4]
    }
  },
  created () {
    this.selectAll = new SelectAll()
    this.selectAll.reset(this.d.length) // 设置可选择总数
  },
  methods: {
    change (checked) {
      this.selectAll.select(checked) // 根据参数决定加减1
      this.allChecked = this.selectAll.isAll()
    },
    onAllSelect (e, checked) {
      this.selectAll.selectAll(checked)
    }
  }
}
</script>
