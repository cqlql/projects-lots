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
    selectAll.setNotSelectNum(this.d.length)
  },
  methods: {
    change (checked) {
      if (checked) {
        selectAll.delNotSelect() // 减 1
      }
    },
    onAllSelect (e, checked) {
      selectAll.setNotSelectNum(0)
    }
  }
}
</script>
