<template>
  <select class="s" @change="$emit('change',$event)" value="2"><slot/></select>
</template>

<script>
export default {
  props: {
    value: ''
  },
  mounted () {
    this.select(this.value)
  },
  methods: {
    select (value) {
      let {options} = this.$el
      for (let i = options.length; i--;) {
        let option = options[i]
        if (option.value === value) {
          option.selected = true
          break
        }
      }
    }
  },
  watch: {
    value (v) {
      this.select(v)
    }
  }
}
</script>


<style scoped>
.s {
  border: 1px solid #dcdcdc;
  padding: 0 12px;
  height: 40px;
  border-radius: 5px;
  outline: none;
}
.s:focus {
    border-color: #0ace82;
}
</style>
