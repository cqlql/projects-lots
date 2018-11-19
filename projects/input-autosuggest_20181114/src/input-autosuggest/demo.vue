<template>
  <div>
    <button @click="setData">设置数据</button>
    <button @click="setData">当前选择项</button>

    <InputAutosuggest ref="vInputAutosuggest" />
  </div>
</template>

<script>
import InputAutosuggest from './index'
export default {
  components: {
    InputAutosuggest
  },
  data () {
    return {

    }
  },
  methods: {
    setData () {
      this.$refs.vInputAutosuggest.valueKeyName = 'v'
      this.$refs.vInputAutosuggest.list = [
        {
          v: 'a'
        },
        {
          v: 'ab'
        },
        {
          v: 'abc'
        },
        {
          v: 'bcde'
        }
      ]
    },
    getSelectedItem () {
      console.log(this.$refs.vInputAutosuggest.getSelectedItem())
    }
  }
}
</script>
