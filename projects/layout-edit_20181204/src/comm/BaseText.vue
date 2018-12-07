<template>
  <input class="form-control" @input="input" @change="$emit('change',$event)" @keyup.enter="$emit('keyupEnter')" @keyup.esc="$emit('keyupEsc')">
</template>

<script>
export default {
  // props: {
  //   placeholder: {
  //     type: String,
  //     defalut: ''
  //   },
  //   value: String
  // },
  methods: {
    input (e) {
      this.$emit('inputValue', e.target.value)
    },
    focus () {
      this.$el.focus()
    },
    selectAll () {
      let { $el } = this
      $el.selectionStart = 0
      $el.selectionEnd = $el.value.length
      $el.focus()
    }
  }
}
</script>

<style scoped>
.form-control {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  /* border: 1px solid #0ace82; */
  padding: 0 4px;
  height: 20px;
  border-radius: 5px;

  /* transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s; */

  box-sizing: border-box;
  font-size: 14px;
  color:#767575;
  outline: none;
}
.form-control:focus {
    border-color: #0ace82;
}
.form-control::placeholder {
  color: #b7b6b6;
}
</style>
