<template>
  <input type="text" @input="input" :value="val">
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      val: ''
    }
  },
  created () {
    this.val = this.value
  },
  methods: {
    input ({target}) {
      let val = this.val = target.value = target.value.replace(/^(\d*\.{0,1}\d*).*/g, '$1')
      this.$emit('update:value', val)
    }
  },
  watch: {
    value (v) {
      this.val = v
    }
  }
}
</script>
