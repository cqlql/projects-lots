<template>
  <label>
    <input
      class="cb" type="checkbox"
      :checked.prop="checked"
      @change="onChange"
    ><span class="lbt"><slot /></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  methods: {
    onChange (e) {
      this.$emit('change', e.target.checked)
    }
  }
}
</script>

<style scoped>
label {

}
.cb {
vertical-align: middle;
}
.lbt {
  vertical-align: middle;
}
</style>
