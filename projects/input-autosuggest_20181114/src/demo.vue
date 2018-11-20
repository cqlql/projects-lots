<template>
  <div>
    <button @click="setData">设置数据1</button>
    <button @click="setData2">设置数据2</button>
    <button @click="getSelectedItem">当前选择项</button>

    <InputAutosuggest ref="vInputAutosuggest" @dataChange="dataChange"/>
  </div>
</template>

<script>
import InputAutosuggest from './InputAutosuggest'
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
    setData2 () {
      this.$refs.vInputAutosuggest.valueKeyName = 'value'
      this.$refs.vInputAutosuggest.list = [
        {
          value: 'a2'
        },
        {
          value: 'ab2'
        },
        {
          value: 'abc2'
        },
        {
          value: 'bcde2'
        }
      ]
    },
    getSelectedItem () {
      console.log(this.$refs.vInputAutosuggest.selectedItem)
    },
    dataChange (selectedItem) {
      console.log(selectedItem)
    }
  }
}
</script>
