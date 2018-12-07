<template>
  <div>
    <BaseCheckbox v-for="(option,i) of options" :class="{err:error}" :checked="option" class="lb" :key="i" @change="e => onChange(e.target.checked, i)">{{toLetter(i)}}</BaseCheckbox>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/forms/BaseCheckbox'
import { toLetter, letterToIndex } from '@/modules/corejs/str-handle/letter-convert.js'
export default {
  props: {
    value: String,
    error: Boolean
  },
  data () {
    return {
      options: [false, false, false, false]
    }
  },
  created () {
    this.initSet()
  },
  methods: {
    toLetter,
    onChange (value, i) {
      let {options} = this
      options[i] = value
      let values = ''
      options.forEach((v, i) => {
        if (v) values += toLetter(i)
      })
      this.$emit('change', values)
    },
    initSet () {
      let { value } = this
      let options = new Array(4)
      for (let i = value.length; i--;) {
        options[letterToIndex(value[i])] = true
        // $set(options, letterToIndex(value[i]), true)
      }
      this.options = options
    }
  },
  watch: {
    value (v) {
      this.initSet()
    }
  },
  components: {
    BaseCheckbox
  }
}
</script>

<style scoped>
.lb {
  padding-right: 10px;
}
.err >>> .lbt{
  color:#ed5564;
}
</style>

