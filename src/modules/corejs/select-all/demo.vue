<template>
  <div>
    <p><BaseCheckbox v-model="allChecked" @change="changeAll">全选{{ allChecked }}</BaseCheckbox></p>
    <p v-for="(item, i) of d" :key="i">
      <BaseCheckbox :checked="item.checked" @change="checked => {change(checked, item)}">{{ i }} {{ item.checked }}</BaseCheckbox>
    </p>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/forms/BaseCheckbox.vue'
import SelectAll from '@/modules/corejs/select-all'
export default {
  components: {
    BaseCheckbox
  },
  data () {
    return {
      allChecked: false,
      d: [
        {
          checked: false
        },
        {
          checked: false
        },
        {
          checked: false
        },
        {
          checked: false
        }
      ]
    }
  },
  created () {
    this.selectAll = new SelectAll()
    this.selectAll.total = this.d.length // 可选择总数
    this.selectAll.selectNum = 0 // 已选数
  },
  methods: {
    change (checked, itemData) {
      itemData.checked = checked
      this.selectAll.select(checked) // 根据参数决定加减1
      this.allChecked = this.selectAll.isAll()
      console.log(this.selectAll.selectNum)
    },
    changeAll (checked) {
      this.selectAll.selectAll(checked)
      this.d.forEach(item => {
        item.checked = checked
      })
    }
  }
}
</script>
