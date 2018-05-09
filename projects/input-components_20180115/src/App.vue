<template>
  <div>
    {{value}}
    <input type="text" v-model.number="value">

    <h2>完全不允许非数字输入</h2>
    <p>支持小数</p>
    <InputNumber :value.sync="inputNumberValue" />
    <p>结果：{{inputNumberValue}}</p>
  </div>
</template>

<script>
  import InputNumber from './modules/input-components/InputNumber.vue'
  export default {
    data () {
      return {
        value: '',
        inputNumberValue: '1'
      }
    },
    components: {
      InputNumber
    }
  }
</script>
